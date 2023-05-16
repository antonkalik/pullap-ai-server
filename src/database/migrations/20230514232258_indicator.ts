import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('indicator', function (table) {
    table.increments('id').primary();
    table.integer('age').notNullable();
    table.integer('weight').notNullable();
    table.integer('height').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('user').onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('indicator');
}
