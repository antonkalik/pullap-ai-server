import { LifeStyle } from 'src/constants/indicators';

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
  life_style: LifeStyle;
  user_id: number;
};

export interface User extends DatabaseDate {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  role: Role;
}

export type ActivityDescription = {
  description: string;
  water_consume: number;
  distance?: number;
  plan: string[];
};

export type Activity = {
  id: number;
  activity_type: string;
  is_completed: boolean;
  duration: number;
  created_at: Date;
};
