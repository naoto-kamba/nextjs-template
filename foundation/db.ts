import { Client } from 'pg'
const config = {
  host: 'localhost',
  port: 25432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
}

const select = async () => {
  const client = new Client(config)
  await client.connect()
  const result = await client.query('select * from tbm_test')
  await client.end()
  return result
}

export const DB = {
  select,
}
