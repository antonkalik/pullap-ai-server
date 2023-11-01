require('dotenv').config();
require('ts-node/register');
import type { Knex } from 'knex';

const connection: Knex.ConnectionConfig = {
  host: process.env.POSTGRES_HOST as string,
  database: process.env.POSTGRES_DB as string,
  user: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
};

const commonConfig: Knex.Config = {
  client: 'pg',
  connection,
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

export default {
  development: {
    ...commonConfig,
  },
  test: {
    ...commonConfig,
    connection: {
      ...connection,
      database: process.env.POSTGRES_DB_TEST as string,
    },
  },
};
