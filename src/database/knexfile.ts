require('dotenv').config({
  path: '../../.env',
});
require('ts-node/register');

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const commonConfig = {
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

export default {
  development: {
    client: 'pg',
    ...commonConfig,
  },
  staging: {
    client: 'postgresql',
    ...commonConfig,
  },
  production: {
    client: 'postgresql',
    ...commonConfig,
  },
};
