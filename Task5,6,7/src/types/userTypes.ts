import { Model, BuildOptions } from 'sequelize';

export type UserDTO = {
  login: string;
  password: string;
  age: number;
};

export type UserQuery = {
  loginSubstring: string;
  limit: string;
};

export interface UserModelType extends Model {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModelType;
};
