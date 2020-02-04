import { Model, BuildOptions } from 'sequelize';

export type GroupDTO = {
  name: string;
  permissions: Array<string>;
};

export interface GroupModel extends Model {
  id: number;
  name: string;
  permissions: Array<string>;
}

export type GroupModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupModel;
};
