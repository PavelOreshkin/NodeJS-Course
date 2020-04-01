import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: any) => {
    const token: any = req.headers['x-access-token'];
    console.log('token: ', token);
    if (token) {
        jwt.verify(token, 'secret', (err: any) => {
            if (err) {
                res.json({ message: 'Failed to authenticate token.' });
            } else {
                return next();
            }
        });
    } else {
        res.status(403).send({ message: 'No token provided.' });
    }
};
