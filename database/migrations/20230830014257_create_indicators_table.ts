import { Knex } from 'knex';
import { LifeStyle } from "../../src/constants/indicators";

const tableName = 'indicators';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.integer('age').notNullable();
    table.integer('weight').notNullable();
    table.integer('height').notNullable();
    table.integer('run_distance');
    table.integer('run_time');
    table.integer('run_heart_rate');
    table.enu('life_style', Object.values(LifeStyle)).notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
