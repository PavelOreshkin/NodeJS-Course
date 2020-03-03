import UserModel from '../models/userModel';
import { Op } from '../data-access';
import GroupModel from '../models/groupModel';
import { UserModelType } from '../types/userTypes';

export default class UserService {
    static async getUserById(id: number): Promise<object> {
        return await UserModel.findAll({
            include: [{ model: GroupModel, as: 'groups' }],
            where: { id }
        });
    }

    static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserModelType[]> {
        return await UserModel.findAll({
            where: loginSubstring && { login: { [Op.iLike]: `%${loginSubstring}%` } },
            limit: limit || null
        });
    }

    static async deleteUser(id: number): Promise<boolean> {
        const result: [number, UserModelType[]] = await UserModel.update(
            { isDeleted: true },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async addUser(login: string, password: string, age: number): Promise<number> {
        const user: { id: number } = await UserModel.create({ login, password, age });
        return user.id;
    }

    static async editUser(id: number, login: string, password: string, age: number): Promise<boolean> {
        const result: [number, UserModelType[]] = await UserModel.update(
            { login, password, age },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async isUserExist(id: number): Promise<boolean> {
        const count: number = await UserModel.count({ where: { id } });
        return (count !== 0);
    }
}
