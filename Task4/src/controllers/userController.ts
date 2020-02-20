import { Request, Response, NextFunction, Router } from 'express';
import UserService from '../services/userServices';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserDTO } from '../types/userTypes';
import { validationMiddleware } from '../validations';
import { addUserSchema, editUserSchema } from '../validations/userSchemes';

export const UserController = (router: Router): void => {
    router.param('id', async (req: Request, res: Response, next: NextFunction, id: string): Promise<void> => {
        console.log('req: ', req.url);

        const success: boolean = await UserService.isUserExist(Number(id));
        if (success) {
            next();
            return;
        }
        res.status(404).json({ message: `User with id=${id} not found` });
    });

    router.get('/user/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const user: Object = await UserService.getUserById(id);
        res.json({ user });
    });

    router.get('/users', async (req: Request, res: Response): Promise<void> => {
        const { loginSubstring, limit }: ParamsDictionary = req.query;
        const users: Object = await UserService.getAutoSuggestUsers(loginSubstring, Number(limit));
        res.json({ users });
    });

    const addUserValidation = validationMiddleware(addUserSchema);
    router.post('/user', addUserValidation,
        async (req: Request, res: Response): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            const id: string = await UserService.addUser(login, password, age);
            res.status(201).json({ id });
        }
    );

    const editUserValidation = validationMiddleware(editUserSchema);
    router.put('/user/:id', editUserValidation,
        async (req: Request, res: Response): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            const id: number = Number(req.params.id);
            const success: boolean = await UserService.editUser(id, login, password, age);
            if (success) {
                res.status(200).json({ message: 'user edited success' });
                return;
            }
            res.status(400).json({ message: 'something went wrong' });
        }
    );

    router.delete('/user/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const success: boolean = await UserService.deleteUser(id);
        if (success) {
            res.status(200).json({ message: 'user deleted success' });
            return;
        }
        res.status(400).json({ message: 'something went wrong' });
    });
};
