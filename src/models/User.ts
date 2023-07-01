import { Model } from "src/models/Model";
import { Role, Status } from 'src/@types';

export interface UserType {
  id: string,
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  country_code: string;
  phone: string;
  address: string;
  role: Role;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

export class User extends Model {
  static tableName = 'user';

  public static async create<Payload>(data: Payload) {
    return super.insert<Payload, UserType>(data);
  }

  public static findByEmail(email: string) {
    return this.findBy({ email });
  }

  public static findByPhone(phone: string) {
    return this.findBy({ phone });
  }
}
