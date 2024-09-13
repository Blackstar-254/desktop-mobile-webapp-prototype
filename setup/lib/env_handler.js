const fs = require('fs')
const crypto = require('node:crypto')

const { z } = require('zod')
const dotenv = require('dotenv')
const readline = require('node:readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

dotenv.config()

const workEnvSchema = z
  .enum(['development', 'test', 'production', 'debug'])
  .default('development')

const parse_string = z.string().regex(/(?!=[@:;\+\-\.\,\!])/)
const parse_port = z.coerce.number()
const parse_nextauth_secret = z.string().length(32).regex(/(?!=[!\-\.])/)
const envItemsSchema = z.object({
  DATABASE_HOST: parse_string,
  DATABASE_DATABASENAME: parse_string,
  DATABASE_USER: parse_string,
  DATABASE_PASSWORD: parse_string,
  DATABASE_PORT: parse_port,
  DATABASE_URL: z.string().url(),

  NODE_ENV: workEnvSchema,
  GIN_MODE: workEnvSchema,
  NEXTAUTH_SECRET: parse_nextauth_secret,
  NEXTAUTH_URL: z.string().url(),

  GOLANG_API_PORT: parse_port,
  PORT: parse_port,

  SUPABASE_REFERENCE_ID: parse_string,
  NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_PROJECT_URL: z.string().url(),

  SUPABASE_SERVICE_ROLE_SECRET: z.string().min(4),
  SUPABASE_JWT_SECRET: z.string().min(4),
})

const generate_secret = () => {
  const uuid = crypto.randomUUID
  let res = ''
  for (let i = 6; i; i--) {
    res += uuid()
  }
  res = res.replaceAll(/\-/g, '')
  let rand = crypto.randomInt(365)
  if (rand % 19) {
    return res.slice(-34)
  } else if (rand % 13) {
    return res.slice(12)
  } else if (rand % 9) {
    return res.slice(19)
  } else if (rand % 5) {
    return res.slice(9)
  }

  return res
}

const envItems = {
  DATABASE_HOST: '',
  DATABASE_DATABASENAME: '',
  DATABASE_USER: '',
  DATABASE_PASSWORD: '',
  DATABASE_PORT: '',
  DATABASE_URL: '',

  NEXT_PUBLIC_SUPABASE_PROJECT_URL: '',
  NODE_ENV: '',
  GIN_MODE: '',
  NEXTAUTH_SECRET: '',
  NEXTAUTH_URL: 'http://localhost:3000',

  GOLANG_API_PORT: '',
  PORT: '',

  SUPABASE_REFERENCE_ID: '',
  NEXT_PUBLIC_SUPABASE_API_KEY: '',
  SUPABASE_SERVICE_ROLE_SECRET: '',
  SUPABASE_JWT_SECRET: '',
}

const envCreateString = (new_env = false) => {
  let output = ''

  let envObj = new_env ? envItemsSchema.parse(envItems) : envItems

  for (const v of Object.keys(envObj)) {
    output = `${output}\n${v}="${envItems[v]}"\n`
  }
  output = `${output}\n`

  return output
}

{
  const f_loc = '.env.example'
  const f_data = envCreateString()
  if (fs.existsSync(f_loc)) {
    const f = fs.readFileSync(f_loc, { encoding: 'utf-8', flag: 'r' })
    if (f !== f_data) {
      fs.writeFileSync(f_loc, f_data, { flag: 'w', encoding: 'utf-8' })
    }
  } else {
    fs.writeFileSync(f_loc, f_data, { flag: 'w', encoding: 'utf-8' })
  }
}

envItems.NEXTAUTH_SECRET = generate_secret()
const read_new_var_value = (key) => {
  return new Promise((res, _rej) => {
    rl.question(`${key}? \n`, (value) => {
      let val = value.trim()
      val = val.length ? val : envItems[key]
      console.log(`${key}="${val}"`)
      res(val)
    })
  })
}

// postgresql://postgres.iwaochxhwppfkqmyfkuw:[YOUR-PASSWORD]@aws-0-eu-central-2.pooler.supabase.com:6543/postgres
const read_env = async () => {
  for (const key of Object.keys(envItems)) {
    switch (key) {
      case 'DATABASE_URL': {
        envItems.DATABASE_URL = `postgres://${envItems.DATABASE_USER}:${envItems.DATABASE_PASSWORD}@${envItems.DATABASE_HOST}:${envItems.PORT}/${envItems.DATABASE_DATABASENAME}`
        break
      }
      case 'NEXTAUTH_SECRET':{
        envItems[key] = process.env?.[key] && parse_nextauth_secret.safeParse(process.env[key]).success?process.env[key]: generate_secret().slice(0,32)
        break}
      default:
        if (process.env?.[key]?.length ) {
          envItems[key] = process.env[key]
        } else {
          envItems[key] = await read_new_var_value(key)
        }
    }
    fs.writeFileSync('.env', envCreateString(), {
      flag: 'w',
      encoding: 'utf-8',
    })
  }

  try {
    envItemsSchema.parse(envItems)

    for (const folder of [".",
      'golang_api/src/server',
      'dmwebapp',
      'database_management',
    ]) {
      fs.writeFileSync(`${folder}/.env`, envCreateString(true), {
        flag: 'w',
        encoding: 'utf-8',
      })
      console.log(`written .env in dir: ${folder}`)
    }
  } catch (e) {
    console.error(e)

    process.exit(-1)
  }

  console.log('finished writing envs')
}

read_env()

module.exports = {
  envCreateString,
  envItems,
  envItemsSchema,
}
