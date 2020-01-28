import { UsersModel } from '../models/userModel';
import { Op } from '../data-access';

export default class UserService {
    static async getUserById(id: number): Promise<object> {
        const user = await UsersModel.findByPk(id);
        return user.dataValues;
    }

    static async getAutoSuggestUsers(loginSubstring: string, limit: string) {
        const users = await UsersModel.findAll({
            where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
            limit
        });
        return users.dataValues;
    }

    static async deleteUser(id: number): Promise<boolean> {
        const result = await UsersModel.update(
            { isDeleted: true },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async addUser(login: string, password: string, age: number): Promise<string> {
        const user = await UsersModel.create({ login, password, age });
        return user.dataValues.id;
    }

    static async editUser(id: number, login: string, password: string, age: number): Promise<boolean> {
        const result = await UsersModel.update(
            { login, password, age },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async isUserExist(id: number): Promise<boolean> {
        const count = await UsersModel.count({ where: { id } });
        return (count !== 0);
    }
}
