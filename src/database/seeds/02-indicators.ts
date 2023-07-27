import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

const tableName = 'indicators';

exports.seed = async function (knex: Knex) {
  await knex(tableName).del();

  const usersIds = await knex('users').select('id');
  const indicators = usersIds.map((user, index) => ({
    id: index + 1,
    age: faker.number.int({ min: 1, max: 100 }),
    weight: faker.number.int({ min: 1, max: 100 }),
    height: faker.number.int({ min: 1, max: 100 }),
    user_id: user.id,
  }));

  await knex(tableName).insert(indicators);
};
