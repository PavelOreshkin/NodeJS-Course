// import { Op } from '../data-access';
import { GroupModel } from '../models/groupModel';

export default class GroupService {
    static async getGroupById(id: number): Promise<object> {
        return await GroupModel.findByPk(id);
    }

    // static async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<string> {
    //     if (loginSubstring) {
    //         return await UsersModel.findAll({
    //             where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
    //             limit: limit || null
    //         });
    //     }
    //     return await UsersModel.findAll();
    // }

    // static async deleteUser(id: number): Promise<boolean> {
    //     const result: Array<number> = await UsersModel.update(
    //         { isDeleted: true },
    //         { where: { id } }
    //     );
    //     return (result[0] !== 0);
    // }

    static async addGroup(name: string, permissions: Array<string>): Promise<string> {
        const group: { id: string } = await GroupModel.create({ name, permissions });
        return group.id;
    }

    static async editGroup(id: number, name: string, permissions: Array<string>): Promise<boolean> {
        const result: Array<number> = await GroupModel.update(
            { name, permissions },
            { where: { id } }
        );
        return (result[0] !== 0);
    }

    static async isGroupExist(id: number): Promise<boolean> {
        const count: number = await GroupModel.count({ where: { id } });
        return (count !== 0);
    }
}
