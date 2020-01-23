import { db } from './db/db';
import { UsersTable } from './pg';

// YEEEEEEEEEEEEEEEEEEES
export const addUserFromDb = (login: string, password: string, age: number): Promise<number> => (
    UsersTable.create({ login, password, age }).then((user: any) => user.dataValues.id)
);

// YEEEEEEEEEEEEEEEEEEES
export const editUserFromDb = (id: string, login: string, password: string, age: number) => (
    UsersTable.update(
        { login, password, age },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

// YEEEEEEEEEEEEEEEEEEES
export const deleteUserFromDb = (id: string) => (
    UsersTable.update(
        { isDeleted: true },
        { where: { id } }
    )
        .then((result: Array<number>) => result)
);

// YEEEEEEEEEEEEEEEEEEES
export const getUserByIdFromDb = (id: string): Promise<object> => (
    UsersTable.findByPk(id).then((user: any) => user.dataValues)
);

// NOT
export const getAutoSuggestUsersFromDb = (loginSubstring: string, limit: string) => {
    const regexp = new RegExp(loginSubstring, 'i');

    return db
        .filter(item => regexp.test(item.login))
        .sort((a, b) => {
            if (a.login > b.login) return 1;
            if (a.login < b.login) return -1;
            return 0;
        })
        .splice(0, Number(limit));
};
