import { UserGroupModel } from '../models/userGroupModel';
import { MyServer } from '../data-access';
import { Transaction } from 'sequelize/types';

export default class UserGroupService {
    static async addUsersToGroup(groupId: number, userIds: Array<number>) {
        return await MyServer.transaction(async (transaction: Transaction) => {
            const resultArr = await userIds.map(userId => UserGroupModel.create({ groupId, userId }, { transaction }));
            return Promise.all(resultArr);
        });
    }
}
