import { Model, BuildOptions } from 'sequelize';

export type GroupDTO = {
  name: string;
  permissions: Array<string>;
};

export type GroupQuery = {
  groupSubstring: string;
  limit: string;
};

export interface GroupModelType extends Model {
  id: number;
  name: string;
  permissions: Array<string>;
}

export type GroupModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupModelType;
};
