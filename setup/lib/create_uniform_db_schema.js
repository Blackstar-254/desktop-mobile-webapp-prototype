const cp = require('child_process')
const fs = require('fs')

// const res = cp
//   .execSync('cd database_management && npm run db:generate')
//   .toString()
// console.log(res)

/**
 * @typedef {{
 *  full_path:string
 * index:number
 * name:string
 * dir_path:string
 * new_path:string
 * } }path_item
 */

/**
 * @type {path_item[]}
 */
const schemas = fs
  .readdirSync('./database_management', {
    withFileTypes: true,
    recursive: true,
  })
  .filter((v) => !v.path.includes('node_modules') && v.isFile())
  .filter(
    (v) =>
      v.path.includes('schema') &&
      ((v.name.endsWith('.ts') && !v.name.endsWith('.d.ts')) ||
        v.name.endsWith('.sql')),
  )
  .map((v, i) => {
    return {
      full_path: `${v.path}/${v.name}`.replaceAll('\\', '/'),
      dir_path: v.path.replaceAll('\\', '/'),
      index: i,
      name: v.name,
    }
  })
  .map((v) => {
    /**
     * @type {path_item}
     */
    let curr = v

    if (v.name.endsWith('.ts')) {
      curr.new_path = curr.full_path.replace(
        'database_management/src/schema',
        'dmwebapp/src/server/db/schema',
      )
    } else if (v.name.endsWith('.sql')) {
      curr.new_path = curr.full_path.replace(
        'database_management/schema',
        'golang_api/src/lib/db_access/sql/schema',
      )
    }
    return {
      ...curr,
    }
  })

const ts_schemas = schemas.filter((v) =>
  v.full_path.startsWith('database_management/src/schema'),
)

const sql_schemas = schemas.filter((v) =>
  v.full_path.startsWith('database_management/schema'),
)
// copy ts schemas to

let data = ''
schemas.map((v, i) => {
  // if (i > 0) {
  //   return
  // }
  console.log({ schema: v })
  if (!fs.existsSync(v.dir_path)) {
    fs.mkdirSync(v.dir_path, { recursive: true })
  }
  try {
    // const res = cp.execSync(`cp ${v.full_path} ${v.new_path}`)
    data = fs.readFileSync(v.full_path, { encoding: 'utf-8', flag: 'r' })
    fs.writeFileSync(v.new_path, data, { encoding: 'utf-8', flag: 'w+' })
  } catch (e) {
    console.log('error')
    console.error(e)
  }
})

// console.log({ schemas })
