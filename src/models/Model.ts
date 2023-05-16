import type { Knex } from 'knex';
import { database } from 'src/database';

export class Model<T> {
  protected tableName: string;
  protected database: Knex;

  protected constructor(tableName: string) {
    this.tableName = tableName;
    this.database = database;
  }

  async create(data) {
    return this.database(this.tableName).insert(data).returning<T>('*');
  }

  async update(id, data) {
    return this.database(this.tableName).where({ id }).update(data).returning<T>('*');
  }

  async delete(id) {
    return this.database(this.tableName).where({ id }).del();
  }

  async findById(id) {
    return this.database(this.tableName).where('id', id).first<T>();
  }

  async findBy(data) {
    return this.database(this.tableName).where(data).first<T>();
  }
}
