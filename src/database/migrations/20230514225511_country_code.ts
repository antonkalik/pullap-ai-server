import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', function (table) {
    table.string('country_code').notNullable().defaultTo('34');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', function (table) {
    table.dropColumn('country_code');
  });
}
