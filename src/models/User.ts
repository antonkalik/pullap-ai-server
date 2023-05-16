import { Model } from 'src/models/Model';

interface UserType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  country_code: string;
  phone: string;
  address: string;
  role: Role;
  status: Status;
  created_at: Date;
  updated_at: Date;
}

class User extends Model<UserType> {
  constructor() {
    super('user');
  }
}

export default new User();
