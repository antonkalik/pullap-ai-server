import { UserType } from "src/models/UserModel";

export type Role = 'admin' | 'user';
export type Status = 'active' | 'inactive';
export type JWTUser = Pick<UserType, 'id' | 'email'>;

