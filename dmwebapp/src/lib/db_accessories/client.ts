import { env } from '@blackstar/env'
import { Client } from 'pg'
import { CacheItem } from '../utils/cache_global'

const conn_string = env.DATABASE_URL

export const client = CacheItem('db_conn', async () => {
  const cl = new Client({
    connectionString: conn_string,
  })
  console.log(`connection string: ${conn_string}`)
  await cl.connect()
  return cl
})
