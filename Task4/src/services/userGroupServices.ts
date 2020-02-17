import { UserGroupModel } from '../models/userGroupModel';

export default class UserGroupService {
    static async addUsersToGroup(groupId: number, userIds: Array<number>) {
        const resultArr = await userIds.map(userId => {
            return UserGroupModel.create({ groupId, userId });
        });
        return Promise.all(resultArr);
    }
}
