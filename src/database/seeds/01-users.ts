require('dotenv').config();
import { Knex } from 'knex';
import * as process from 'process';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const tableName = 'users';
const defaultPassword = process.env.DEFAULT_PASSWORD as string;

exports.seed = async function (knex: Knex) {
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
  const testUser = {
    id: users.length + 1,
    email: process.env.TEST_USER_EMAIL,
    first_name: process.env.TEST_USER_NAME,
    last_name: process.env.TEST_USER_LAST_NAME,
    username: process.env.TEST_USER_USERNAME,
    phone: process.env.TEST_USER_PHONE,
    country_code: process.env.TEST_USER_COUNTRY_CODE,
    address_line_1: process.env.TEST_USER_ADDRESS_LINE_1,
    address_line_2: process.env.TEST_USER_ADDRESS_LINE_2,
    role: 'admin',
  };
  const hashed_password = await bcrypt.hash(defaultPassword, 10);
  await knex(tableName).insert(users.map(user => ({ ...user, password: hashed_password })));
};
