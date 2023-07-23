import { Model } from 'src/models/Model';
import { Role, Status } from 'src/@types';

type DefaultUserData = {
  role: string;
};

export interface UserType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  country_code: string;
  phone: string;
  address: string;
  role: Role;
}

const defaultUserData = {
  role: 'user',
  status: 'active',
};

export class UserModel extends Model {
  static tableName = 'user';

  public static async create<Payload>(data: Payload) {
    return super.insert<Payload & DefaultUserData, UserType>({
      ...data,
      ...defaultUserData,
    });
  }

  public static findByEmail(email: string) {
    return this.findBy({ email });
  }

  public static findByPhone(phone: string) {
    return this.findBy({ phone });
  }
}
