import { Knex } from "knex";
import { activities } from "../../src/constants/activities";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('activities', function (table) {
    table.increments('id').primary();
    table.enu('activity_type', Object.values(activities)).notNullable();
    table.string('duration').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('activities');
}

