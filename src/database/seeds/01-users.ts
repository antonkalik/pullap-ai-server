require('dotenv').config();
import * as process from 'process';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const tableName = 'users';
const defaultPassword = process.env.DEFAULT_PASSWORD as string;

exports.seed = async function (knex) {
  await knex(tableName).del();
  const users = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      email: faker.internet.email().toLowerCase(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      username: faker.internet.userName().toLowerCase(),
      phone: faker.phone.number('###-###-###').toString(),
      country_code: '34',
      address_line_1: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      role: faker.helpers.arrayElement(['admin', 'user']),
    }));
  const hashed_password = await bcrypt.hash(defaultPassword, 10);
  await knex(tableName).insert(users.map(user => ({ ...user, password: hashed_password })));
};
