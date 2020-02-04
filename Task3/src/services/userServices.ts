import { UsersModel } from '../models/userModel';
import { Op } from '../data-access';

export default class UserService {
    static async getUsers(): Promise<object> {
        return await UsersModel.findAll();
    }

    static async getUserById(id: number): Promise<object> {
        return await UsersModel.findByPk(id);
    }

    static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<string> {
        if (loginSubstring) {
            return await UsersModel.findAll({
                where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
                limit: limit || null
            });
        }
        return await UsersModel.findAll();
    }

    static async deleteUser(id: number): Promise<boolean> {
        const result: Array<number> = await UsersModel.update(
            { isDeleted: true },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async addUser(login: string, password: string, age: number): Promise<string> {
        const user: { id: string } = await UsersModel.create({ login, password, age });
        return user.id;
    }

    static async editUser(id: number, login: string, password: string, age: number): Promise<boolean> {
        const result: Array<number> = await UsersModel.update(
            { login, password, age },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async isUserExist(id: number): Promise<boolean> {
        const count: number = await UsersModel.count({ where: { id } });
        return (count !== 0);
    }
}
