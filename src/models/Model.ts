import { database } from 'src/database';

export class Model {
  static tableName: string;

  private static get table() {
    if (!this.tableName) {
      throw new Error('You must set a table name!');
    }
    return database(this.tableName);
  }

  public static async insert<Payload, Result>(data: Payload): Promise<Result> {
    const [result] = await this.table.insert(data).returning('*');
    return result;
  }

  public static async update<Payload, Result>(id: string, data: Payload): Promise<Result> {
    const [result] = await this.table.where({ id }).update(data).returning('*');
    return result;
  }

  public static async delete(id: string) {
    return this.table.where({ id }).del();
  }

  public static async findById<Result>(id: string): Promise<Result> {
    return this.table.where('id', id).first();
  }

  public static async findBy<Payload, Result>(data: Payload): Promise<Result | null> {
    return this.table.where(data as string).first();
  }
}
