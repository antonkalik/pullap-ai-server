import { fake_users } from './user_seed';
import { faker } from '@faker-js/faker';

const fake_indicators = fake_users.map((user, index) => ({
  id: index + 1,
  age: faker.number.int({ min: 1, max: 100 }),
  weight: faker.number.int({ min: 1, max: 100 }),
  height: faker.number.int({ min: 1, max: 100 }),
  user_id: user.id,
}));

exports.seed = async function (knex) {
  await knex('indicator').del();
  await knex('indicator').insert(fake_indicators);
};
