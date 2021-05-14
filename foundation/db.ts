import { Client } from 'pg'
import { Utils } from './utils'

const config = {
  host: 'localhost',
  port: 25432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
}

const select = async <T>(sql: string) => {
  const client = new Client(config)
  await client.connect()
  const result = await client.query(sql)
  await client.end()
  return Utils.toCamelCaseObjectArray(result.rows) as T[]
}

export const DB = {
  select,
}
