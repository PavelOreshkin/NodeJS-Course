import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../types/userTypes';
import UserService from '../services/userServices';
import GroupService from '../services/groupServices';
import { ENTITY } from '../constants';
import Joi from '@hapi/joi';

export const validationMiddleware =
    (validationSchema: Joi.ObjectSchema<{ login: string; password: string; age: number; }>) =>
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            try {
                await validationSchema.validateAsync({ login, password, age });
                next();
                return;
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        };

export const verifyEntityExistence = async (req: Request, res: Response, next: NextFunction, id: string) => {
    const entity = req.url.match('/(.*)/')[1];
    let entityMessage: string = '';
    let success: boolean;

    if (entity === ENTITY.USER) {
        success = await UserService.isUserExist(Number(id));
        entityMessage = 'User';
    }

    if (entity === ENTITY.GROUP) {
        success = await GroupService.isGroupExist(Number(id));
        entityMessage = 'Group';
    }

    if (success) {
        next();
        return;
    }

    res.status(404).json({ message: `${entityMessage} with id=${id} not found` });
};
