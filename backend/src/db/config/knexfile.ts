export default {
  client: 'postgresql',
  connection: {
    database: 'postgres',
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + '/../migrations',
  },
  seeds: {
    directory: __dirname + '/../seeds',
  },
}
