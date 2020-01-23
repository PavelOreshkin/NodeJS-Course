import { Request, Response, NextFunction } from 'express';
import { getUserByIdFromDb, getAutoSuggestUsersFromDb, addUserFromDb, editUserFromDb, deleteUserFromDb /* , isUserExistFromDb */ } from './dbServices';
import { ParamsDictionary } from 'express-serve-static-core';
import { RequestBody } from './types';
import { schema } from './validate';
import { UsersTable } from './pg';

// YEEEEEEEEEEEEEEEEEEES
export const isUserExist = (_req: Request, res: Response, next: NextFunction, id: string) => {
    UsersTable.count({ where: { id } })
        .then((count: number) => {
            if (count !== 0) {
                next();
                return;
            }
            res.status(404).json({ message: `User with id=${id} not found` });
        });
};

// YEEEEEEEEEEEEEEEEEEES
export const getUserById = (req: Request, res: Response) => {
    const id: string = req.params.id;
    getUserByIdFromDb(id).then((user: object) => res.json({ user }));
};

// NOT
export const getAutoSuggestUsers = (req: Request, res: Response) => {
    const { loginSubstring, limit }: ParamsDictionary = req.query;
    res.json({ users: getAutoSuggestUsersFromDb(loginSubstring, limit) });
};

// YEEEEEEEEEEEEEEEEEEES
export const addUser = async (req: Request, res: Response) => {
    const { login, password, age }: RequestBody = req.body;

    try {
        await schema.validateAsync({ login, password, age });
        addUserFromDb(login, password, age)
            .then((id: number) => res.status(201).json({ message: `user created success, id=${id}` }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// YEEEEEEEEEEEEEEEEEEES
export const editUser = async (req: Request, res: Response) => {
    const { login, password, age }: RequestBody = req.body;
    const id: string = req.params.id;

    try {
        await schema.validateAsync({ login, password, age });
        editUserFromDb(id, login, password, age).then((item: any) => {
            if (item[0] === 0) {
                return res.status(400).json({ message: 'something went wrong' });
            }
            res.status(200).json({ message: 'user edited success' });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// YEEEEEEEEEEEEEEEEEEES
export const deleteUser = (req: Request, res: Response) => {
    const id: string = req.params.id;

    deleteUserFromDb(id).then((item: any) => {
        if (item[0] === 0) {
            return res.status(400).json({ message: 'something went wrong' });
        }
        res.status(200).json({ message: 'user deleted success' });
    });
};
