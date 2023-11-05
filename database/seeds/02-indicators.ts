import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
import { LifeStyle } from '../../src/constants/indicators';

const tableName = 'indicators';

exports.seed = async function (knex: Knex) {
  await knex(tableName).del();
  const lifeStyleValues = Object.values(LifeStyle);

  const usersIds = await knex('users').select('id');
  const indicators = usersIds.map((user, index) => {
    return {
      id: index + 1,
      age: faker.number.int({ min: 14, max: 60 }),
      weight: faker.number.int({ min: 50, max: 110 }),
      height: faker.number.int({ min: 140, max: 220 }),
      life_style: lifeStyleValues[faker.number.int({ min: 0, max: lifeStyleValues.length - 1 })],
      user_id: user.id,
    };
  });

  await knex(tableName).insert(indicators);
};
