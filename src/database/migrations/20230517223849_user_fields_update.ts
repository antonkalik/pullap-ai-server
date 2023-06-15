import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', function (table) {
    table.string('first_name').notNullable().defaultTo('default first name');
    table.string('last_name').notNullable().defaultTo('default last name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', function (table) {
    table.dropColumn('first_name');
    table.dropColumn('last_name');
  });
}
