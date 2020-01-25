import { UsersModel } from '../models/userModel';
import { Op } from '../models';

export const addUserFromDb = (login: string, password: string, age: number): Promise<number> => (
    UsersModel.create({ login, password, age }).then((user: any) => user.dataValues.id)
);

export const editUserFromDb = (id: string, login: string, password: string, age: number) => (
    UsersModel.update(
        { login, password, age },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

export const deleteUserFromDb = (id: string) => (
    UsersModel.update(
        { isDeleted: true },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

export const getUserByIdFromDb = (id: string): Promise<object> => (
    UsersModel.findByPk(id).then((user: any) => user.dataValues)
);

export const getAutoSuggestUsersFromDb = (loginSubstring: string, limit: string) => (
    UsersModel.findAll({
        where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
        limit
    }).then((users: any) => (
        users.map((user: any) => user.dataValues)
    ))
);
