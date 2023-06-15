require('dotenv').config();
import * as process from 'process';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const defaultPassword = process.env.DEFAULT_PASSWORD as string;

export const fake_users = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    email: faker.internet.email().toLowerCase(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    phone: faker.phone.number('###-###-###').toString(),
    country_code: '34',
    address: faker.location.streetAddress(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  }));

exports.seed = async function (knex) {
  await knex('user').del();
  const hashed_password = await bcrypt.hash(defaultPassword, 10);
  await knex('user').insert(fake_users.map(user => ({ ...user, password: hashed_password })));
};
