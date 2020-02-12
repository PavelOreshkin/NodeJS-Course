import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../types/userTypes';

export const validationMiddleware = (validationSchema: any) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { login, password, age }: UserDTO = req.body;
    try {
        await validationSchema.validateAsync({ login, password, age });
        next();
        return;
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
