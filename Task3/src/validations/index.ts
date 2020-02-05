import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../types';

export const validationMiddleware = async (req: Request, res: Response, next: NextFunction, validationSchema: any): Promise<void> => {
    const { login, password, age }: UserDTO = req.body;
    try {
        await validationSchema.validateAsync({ login, password, age });
        next();
        return;
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
