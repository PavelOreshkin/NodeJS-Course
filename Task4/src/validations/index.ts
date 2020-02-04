import { Request, Response, NextFunction } from 'express';
import { addUserSchema, editUserSchema } from '../validations/userSchemes';
import { methods } from '../constants';
import { UserDTO } from '../types/userTypes';

export const validationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { login, password, age }: UserDTO = req.body;
    try {
        if (req.method === methods.POST) {
            await addUserSchema.validateAsync({ login, password, age });
        }
        if (req.method === methods.PUT) {
            await editUserSchema.validateAsync({ login, password, age });
        }
        next();
        return;
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
