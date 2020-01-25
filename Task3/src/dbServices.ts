import { UsersTable, Op } from './pg';

export const addUserFromDb = (login: string, password: string, age: number): Promise<number> => (
    UsersTable.create({ login, password, age }).then((user: any) => user.dataValues.id)
);

export const editUserFromDb = (id: string, login: string, password: string, age: number) => (
    UsersTable.update(
        { login, password, age },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

export const deleteUserFromDb = (id: string) => (
    UsersTable.update(
        { isDeleted: true },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

export const getUserByIdFromDb = (id: string): Promise<object> => (
    UsersTable.findByPk(id).then((user: any) => user.dataValues)
);

export const getAutoSuggestUsersFromDb = (loginSubstring: string, limit: string) => (
    UsersTable.findAll({
        where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
        limit
    }).then((users: any) => (
        users.map((user: any) => user.dataValues)
    ))
);
