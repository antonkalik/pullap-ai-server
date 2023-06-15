import validator from 'validator';
import { ValidationSchema } from './types';

export const userSchema: ValidationSchema = {
  email: validator.isEmail,
  password: (str: string) => validator.isLength(str, { min: 6 }),
  phone: validator.isMobilePhone,
  country_code: (str: string) => validator.isLength(str, { min: 2, max: 2 }),
  first_name: (str: string) => validator.isLength(str, { min: 1 }),
  last_name: (str: string) => validator.isLength(str, { min: 1 }),
  address: (str: string) => validator.isLength(str, { min: 1 }),
};
