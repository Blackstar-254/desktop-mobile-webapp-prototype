const fs = require("fs")
const { z } = require('zod')
const dotenv = require('dotenv')
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



dotenv.config()


const workEnvSchema = z
  .enum(['development', 'test', 'production'])
  .default('development')

const envItemsSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_DATABASENAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_URL: z.string().url(),

  NODE_ENV: workEnvSchema,
  GIN_MODE: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),

  GOLANG_API_PORT: z.string().regex(/[0-9]{2-4}/),
  PORT: z.string().regex(/[0-9]{2-4}/),

  SUPABASE_REFERENCE_ID: z.string(),
  NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_PROJECT_URL: z.string().url(),

  SUPABASE_SERVICE_ROLE_SECRET: z.string().min(4),
  SUPABASE_JWT_SECRET: z.string().min(4),
})

const envItems = {
  DATABASE_HOST: '',
  DATABASE_DATABASENAME: '',
  DATABASE_USER: '',
  DATABASE_PASSWORD: '',
  DATABASE_PORT: '',
  DATABASE_URL: '',

  SUPABASE_PROJECT_URL: '',
  NODE_ENV: '',
  GIN_MODE: '',
  NEXTAUTH_SECRET: '',
  NEXTAUTH_URL: '',

  GOLANG_API_PORT: '',
  PORT: '',

  SUPABASE_REFERENCE_ID: '',
  NEXT_PUBLIC_SUPABASE_API_KEY: '',
  SUPABASE_SERVICE_ROLE_SECRET: '',
  SUPABASE_JWT_SECRET: '',
}

const envCreateString = () => {
  let output = ''

  envItems.DATABASE_URL = `postgres://${envItems.DATABASE_USER}:${envItems.DATABASE_PASSWORD}@${envItems.DATABASE_HOST}:${envItems.PORT}/${envItems.DATABASE_DATABASENAME}`
  let envObj = envItemsSchema.parse(envItems)

  for (const v of Object.keys(envObj)) {
    output = `${output}\n${v}="${envItems[v]}"\n`
  }
  output = `${output}\n`

  return output
}
fs.writeFileSync(".env.example",envCreateString(),{flag:'w',encoding:'utf-8'})
const read_new_var_value = (prompt)=>{
  return new Promise((res,rej)=>{
    rl.question(`${prompt}? `, (value) => {
      const val = value.trim()
        console.log(`${prompt}="${val}"`);
        res(val)
      });
  })
}
const read_env = async() => {
 
    
    for (const key of Object.keys(envItems)) {
      if(process.env[key]){
        envItems[key] = process.env[key]
      }else{
        envItems[key] = await read_new_var_value(key)
      }
      
    }
    
 
    try {
      envItemsSchema.parse(envItems)
      rl.close()
    }catch(e){
      console.error(e)
      process.exit(-1)
    }
}

read_env()

module.exports = {
  envCreateString,
  envItems,
  envItemsSchema,
}
