import { LifeStyle } from "src/constants/indicators";

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export type UserSession = {
  id: number;
};

export type DatabaseDate = {
  created_at: Date;
  updated_at: Date;
};

export type DefaultUserData = {
  role: string;
};

export type Indicator = {
  id: number;
  age: number;
  weight: number;
  height: number;
  run_distance: number;
  run_time: number;
  run_pace: number;
  run_heart_rate: number;
  life_style: LifeStyle;
  user_id: number;
}

export interface User extends DatabaseDate {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  role: Role;
}
