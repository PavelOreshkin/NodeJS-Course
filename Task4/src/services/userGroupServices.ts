import { UsersModel } from '../models/userModel';
import { Op } from '../data-access';

export default class UserGroupService {
    // static async addUser(login: string, password: string, age: number): Promise<string> {
    //     const user: { id: string } = await UsersModel.create({ login, password, age });
    //     return user.id;
    // }
    static async addUserToGroup(login: string, password: string, age: number): Promise<string> {
        const user: { id: string } = await UsersModel.create({ login, password, age });
        return user.id;
    }

    // static async isUserExist(id: number): Promise<boolean> {
    //     const count: number = await UsersModel.count({ where: { id } });
    //     return (count !== 0);
    // }
}
