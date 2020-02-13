import { Request, Response, NextFunction, Router } from 'express';
import UserService from '../services/userServices';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserDTO } from '../types/userTypes';
import { validationMiddleware } from '../validations';
import { addUserSchema, editUserSchema } from '../validations/userSchemes';

export const UserGroupController = (router: Router): void => {
    // router.param('id', async (_req: Request, res: Response, next: NextFunction, id: string): Promise<void> => {
    //     const success: boolean = await UserService.isUserExist(Number(id));
    //     if (success) {
    //         next();
    //         return;
    //     }
    //     res.status(404).json({ message: `User with id=${id} not found` });
    // });

    // router.get('/users', async (req: Request, res: Response): Promise<void> => {
    //     const { loginSubstring, limit }: ParamsDictionary = req.query;
    //     const users: Object = await UserService.getAutoSuggestUsers(loginSubstring, Number(limit));
    //     res.json({ users });
    // });



    // const addUserValidation = validationMiddleware(addUserSchema);
    // router.post('/user', addUserValidation,
    //     async (req: Request, res: Response): Promise<void> => {
    //         const { login, password, age }: UserDTO = req.body;
    //         const id: string = await UserService.addUser(login, password, age);
    //         res.status(201).json({ id });
    //     }
    // );

    router.post('/userGroup', // TODO VALIDATION
        async (req: Request, res: Response): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            const id: string = await UserService.addUser(login, password, age);
            res.status(201).json({ id });
        }
    );
};
