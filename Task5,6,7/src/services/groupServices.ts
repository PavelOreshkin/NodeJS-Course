import { Op } from '../data-access';
import GroupModel from '../models/groupModel';
import UserModel from '../models/userModel';
import { GroupModelType } from '../types/groupTypes';

export default class GroupService {
    static async getGroupById(id: number): Promise<object> {
        return await GroupModel.findByPk(id, {
            include: [{ model: UserModel, as: 'users' }]
        });
    }

    static async getAllGroups(groupSubstring: string, limit: number): Promise<GroupModelType[]> {
        return await GroupModel.findAll({
            where: groupSubstring && { name: { [Op.iLike]: `%${groupSubstring}%` } },
            limit: limit || null
        });
    }

    static async deleteGroup(id: number): Promise<boolean> {
        const result: number = await GroupModel.destroy(
            { where: { id } }
        );
        return result > 0;
    }

    static async addGroup(name: string, permissions: Array<string>): Promise<number> {
        const group: { id: number } = await GroupModel.create({ name, permissions });
        return group.id;
    }

    static async editGroup(id: number, name: string, permissions: Array<string>): Promise<boolean> {
        const result: [number, GroupModelType[]] = await GroupModel.update(
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
