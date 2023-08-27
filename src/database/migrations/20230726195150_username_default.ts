import { Knex } from 'knex';
import usernameTriggerSql from 'src/sql/triggers/username_trigger.sql';

const tableName = 'users';
const formattedTriggerSql = usernameTriggerSql.replace('%s', tableName);

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.string('username').defaultTo('username_default');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, function (table) {
    table.dropColumn('username');
  });
  await knex.raw(formattedTriggerSql);
}
