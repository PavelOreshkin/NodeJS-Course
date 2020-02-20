import UserModel from '../models/userModel';
import { Op } from '../data-access';
import GroupModel from '../models/groupModel';
import { UserGroupModel } from '../models/userGroupModel';

export default class UserService {
    static async getUserById(id: number): Promise<object> {
        return await UserModel.findByPk(id);
    }

    static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<string> {
        if (loginSubstring) {
            return await UserModel.findAll({
                where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
                limit: limit || null
            });
        }
        return await UserModel.findAll({ include: 'Groups' });
        // return await UserModel.findAll({ include: GroupModel });
        // return await UserModel.findAll({
        //     include: {
        //         model: 'Group',
        //         as: 'group'
        //     }
        // });
        // return await UserModel.findAll({
        //     include: [{
        //         model: GroupModel,
        //         as: 'groups',
        //         required: false,
        //         // Pass in the Product attributes that you want to retrieve
        //         // attributes: ['id', 'name'],
        //         through: {
        //             // This block of code allows you to retrieve the properties of the join table
        //             model: UserGroupModel,
        //             as: 'productOrders',
        //             // attributes: ['qty'],
        //         }
        //     }]
        // });
    }

    static async deleteUser(id: number): Promise<boolean> {
        const result: Array<number> = await UserModel.update(
            { isDeleted: true },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async addUser(login: string, password: string, age: number): Promise<string> {
        const user: { id: string } = await UserModel.create({ login, password, age });
        return user.id;
    }

    static async editUser(id: number, login: string, password: string, age: number): Promise<boolean> {
        const result: Array<number> = await UserModel.update(
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
