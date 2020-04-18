import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { jwtExpireTime } from '../config';

const router: Router = express.Router();

const admin = {
    id: 1,
    username: 'username123',
    password: 'pass123'
};

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (username === admin.username && password === admin.password) {
        const payload = { 'sub': admin.id };
        const token = jwt.sign(payload, 'secret', { expiresIn: jwtExpireTime });
        res.status(200).send({ token });
    } else {
        res.status(403).send({ message: 'Bad username/password combination.' });
    }
});

export default router;
