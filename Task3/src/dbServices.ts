import { db } from './db/db';

export const getNewId = (): string => {
    const currentId = db.reduce((prev, item) => {
        const id = Number(item.id);
        return (id > prev) ? id : prev;
    }, 0);
    return String(currentId + 1);
};

export const addUserFromDb = (login: string, password: string, age: number) => {
    const id = getNewId();
    db.push({ login, password, age, id, isDeleted: false });
    return id;
};

export const editUserFromDb = (id: string, login: string, password: string, age: number) => {
    db.forEach(item => {
        if (item.id !== id) return;
        if (login) item.login = login;
        if (password) item.password = password;
        if (age) item.age = age;
    });
};

export const deleteUserFromDb = (id: string) => {
    db.forEach(item => {
        if (item.id === id) item.isDeleted = true;
    });
};

export const isUserExistFromDb = (id: string): boolean => {
    const index = db.findIndex(item => item.id === id);
    return index >= 0;
};

export const getUserByIdFromDb = (id: string): object => {
    return db[db.findIndex(item => item.id === id)];
};

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
