import express, { Request, Response, Router } from 'express';
import UserService from '../services/userServices';
import { UserDTO } from '../types/userTypes';
import { validationMiddleware, verifyEntityExistence } from '../validations';
import { addUserSchema, editUserSchema } from '../validations/userSchemes';
import { ENTITY } from '../constants';
import { UserQuery } from '../types/userTypes';
import { sendLog } from '../logger';

const router: Router = express.Router();

router.param('id', verifyEntityExistence(ENTITY.USER));

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);
    const user: Object = await UserService.getUserById(id);
    res.json({ user });
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const { loginSubstring, limit }: UserQuery = req.query;
    const users: Object = await UserService.getAutoSuggestUsers(loginSubstring, Number(limit));
    res.json({ users });
});

router.post('/', validationMiddleware(addUserSchema),
    async (req: Request, res: Response): Promise<void> => {
        const { login, password, age }: UserDTO = req.body;
        const id: number = await UserService.addUser(login, password, age);
        res.status(201).json({ id });
    }
);

router.put('/:id', validationMiddleware(editUserSchema),
    async (req: Request, res: Response): Promise<void> => {
        const { method, path } = req;
        const { login, password, age }: UserDTO = req.body;
        const id: number = Number(req.params.id);
        const success: boolean = await UserService.editUser(id, login, password, age);
        if (success) {
            res.status(200).json({ message: 'user edited success' });
            return;
        }
        const message = 'user edit error';
        sendLog({ method, path, id, message });
        res.status(400).json({ message: 'something went wrong' });
    }
);

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { method, path } = req;
    const id: number = Number(req.params.id);
    const success: boolean = await UserService.deleteUser(id);
    if (success) {
        res.status(200).json({ message: 'user deleted success' });
        return;
    }
    const message = 'user deleted error';
    sendLog({ method, path, message });
    res.status(400).json({ message: 'something went wrong' });
});

export default router;
