import { Op } from '../data-access';
import GroupModel from '../models/groupModel';

export default class GroupService {
    static async getGroupById(id: number): Promise<object> {
        return await GroupModel.findByPk(id);
    }

    static async getAllGroups(groupSubstring: string, limit: number): Promise<string> {
        if (groupSubstring) {
            return await GroupModel.findAll({
                include: 'users',
                where: { name: { [Op.iLike]: `%${groupSubstring}%` } },
                limit: limit || null
            });
        }
        return await GroupModel.findAll({ include: 'users' });
    }

    static async deleteGroup(id: number): Promise<boolean> {
        const result: number = await GroupModel.destroy(
            { where: { id } }
        );
        return result > 0;
    }

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
