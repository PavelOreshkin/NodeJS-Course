import { Request, Response, NextFunction } from 'express';
import { getUserByIdFromDb, getAutoSuggestUsersFromDb, addUserFromDb, editUserFromDb, deleteUserFromDb, isUserExistFromDb } from './dbServices';
import { ParamsDictionary } from 'express-serve-static-core';
import { RequestBody } from './types';
import { schema } from './validate';

export const isUserExist = (_req: Request, res: Response, next: NextFunction, id: string) => {
    if (isUserExistFromDb(id)) {
        next();
        return;
    }
    res.status(404).json({ message: `User with id=${id} not found` });
};

export const getUserById = (req: Request, res: Response) => {
    const id: string = req.params.id;
    res.json({ user: getUserByIdFromDb(id) });
};

export const getAutoSuggestUsers = (req: Request, res: Response) => {
    const { loginSubstring, limit }: ParamsDictionary = req.query;
    res.json({ users: getAutoSuggestUsersFromDb(loginSubstring, limit) });
};

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

export const editUser = async (req: Request, res: Response) => {
    const { login, password, age }: RequestBody = req.body;
    const id: string = req.params.id;

    try {
        await schema.validateAsync({ login, password, age });
        editUserFromDb(id, login, password, age);
        res.status(200).json({ message: 'user edited success' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUser = (req: Request, res: Response) => {
    const id: string = req.params.id;
    deleteUserFromDb(id);
    res.status(200).json({ message: 'user deleted success' });
};
