const { faker } = require('@faker-js/faker');

const fake_users = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number('+34-###-###-###').toString(),
    address: faker.location.streetAddress(),
    role: faker.helpers.arrayElement(['admin', 'user']),
    status: faker.helpers.arrayElement(['active', 'inactive']),
  }));

exports.seed = async function (knex) {
  await knex('user').del();
  await knex('user').insert(fake_users);
};
