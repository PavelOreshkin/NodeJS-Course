import express, { Router, Request, Response, NextFunction } from 'express';
import { app } from '../app';
import UserService from '../services/userServices';
import { ParamsDictionary } from 'express-serve-static-core';
import { schema } from '../validations/validations';
import { RequestBody } from '../types/types';

const router: Router = express.Router();

export const UserController = () => {
    app.use(express.json());
    app.use('/', router);

    router.param('id', async (_req: Request, res: Response, next: NextFunction, id: string) => {
        const success = await UserService.isUserExist(id);
        if (success) {
            next();
            return;
        }
        res.status(404).json({ message: `User with id=${id} not found` });
    });

    router.get('/user/:id', async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const user = await UserService.getUserById(id);
        res.json({ user });
    });

    router.get('/userSuggest', async (req: Request, res: Response) => {
        const { loginSubstring, limit }: ParamsDictionary = req.query;
        const users = await UserService.getAutoSuggestUsers(loginSubstring, limit);
        res.json({ users });
    });

    router.post('/user', async (req: Request, res: Response) => {
        const { login, password, age }: RequestBody = req.body;
        try {
            await schema.validateAsync({ login, password, age });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
        const id = await UserService.addUser(login, password, age);
        res.status(201).json({ message: `user created success, id=${id}` });
    });

    router.put('/user/:id', async (req: Request, res: Response) => {
        const { login, password, age }: RequestBody = req.body;
        const id: string = req.params.id;
        try {
            await schema.validateAsync({ login, password, age });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
        const success = await UserService.editUser(id, login, password, age);

        if (success) {
            return res.status(200).json({ message: 'user edited success' });
        }
        return res.status(400).json({ message: 'something went wrong' });
    });

    router.delete('/user/:id', async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const success = await UserService.deleteUser(id);
        if (success) {
            return res.status(200).json({ message: 'user deleted success' });
        }
        return res.status(400).json({ message: 'something went wrong' });
    });
};
