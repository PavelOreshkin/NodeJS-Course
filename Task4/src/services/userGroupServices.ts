import { UserGroupModel } from '../models/userGroupModel';
import { Op } from '../data-access';

export default class UserGroupService {
    // static async addUser(login: string, password: string, age: number): Promise<string> {
    //     const user: { id: string } = await UsersModel.create({ login, password, age });
    //     return user.id;
    // }

    // static async addUsersToGroup(groupId: number, userIds: Array<number>) {
    //     const resultArr = await userIds.map(userId => {
    //         return UserGroupModel.create({ groupId, userId });
    //     });
    //     console.log('resultArr: ', resultArr);
    //     return resultArr;
    // }
    static async addUsersToGroup(groupId: number, userId: number) {
        return await UserGroupModel.create({ groupId, userId });
    }

    // static async isUserExist(id: number): Promise<boolean> {
    //     const count: number = await UsersModel.count({ where: { id } });
    //     return (count !== 0);
    // }
}
