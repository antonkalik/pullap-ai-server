require('dotenv').config();
import { Knex } from 'knex';
import * as process from 'process';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { Role, User } from '../../src/@types';

const tableName = 'users';
const defaultPassword = process.env.DEFAULT_PASSWORD as string;

exports.seed = async function (knex: Knex) {
  await knex(tableName).del();
  const users: Omit<User, 'id' | 'password' | 'created_at' | 'updated_at'>[] = [
    ...Array(10).keys(),
  ].map(() => ({
    email: faker.internet.email().toLowerCase(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    username: faker.internet.userName().toLowerCase(),
    role: Role.User,
  }));
  const testUser = {
    email: process.env.TEST_USER_EMAIL as string,
    first_name: process.env.TEST_USER_FIRST_NAME as string,
    last_name: process.env.TEST_USER_LAST_NAME as string,
    username: process.env.TEST_USER_USERNAME as string,
    role: Role.Admin,
  };
  users.push(testUser);
  const hashed_password = await bcrypt.hash(defaultPassword, 10);
  await knex(tableName).insert(users.map(user => ({ ...user, password: hashed_password })));
};
