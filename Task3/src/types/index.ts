import { Model, BuildOptions } from 'sequelize';

export type UserDTO = {
  login: string;
  password: string;
  age: number;
};

export interface UserModel extends Model {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};
