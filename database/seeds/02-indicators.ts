import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
import { LifeStyle } from '../../src/constants/indicators';

const tableName = 'indicators';

exports.seed = async function (knex: Knex) {
  await knex(tableName).del();
  const lifeStyleValues = Object.values(LifeStyle);

  const usersIds = await knex('users').select('id');
  const indicators = usersIds.map((user, index) => ({
    id: index + 1,
    age: faker.number.int({ min: 1, max: 100 }),
    weight: faker.number.int({ min: 1, max: 100 }),
    height: faker.number.int({ min: 1, max: 100 }),
    run_distance: faker.number.int({ min: 1, max: 10000 }),
    run_time: faker.number.int({ min: 1, max: 10000 }),
    run_pace: faker.number.int({ min: 1, max: 100 }),
    run_heart_rate: faker.number.int({ min: 1, max: 100 }),
    life_style: lifeStyleValues[faker.number.int({ min: 0, max: lifeStyleValues.length - 1 })],
    user_id: user.id,
  }));

  await knex(tableName).insert(indicators);
};
