import express, { Router, Application, Request, Response, NextFunction } from 'express';
import { deleteUser, addUser, isUserExist, getUserById, editUser, getAutoSuggestUsers } from './helpers';
import { RequestBody, ValidationError } from './types';
import { schema } from './validate';
import { ParamsDictionary } from 'express-serve-static-core';

const app: Application = express();
const router: Router = express.Router();

app.listen(3000, () => console.log('server running'));

app.use(express.json());
app.use('/', router);

router.param('id', (_req: Request, res: Response, next: NextFunction, id: string) => {
    if (isUserExist(id)) {
        next();
        return;
    }
    res.status(404).json({ message: `User with id=${id} not found` });
});

router.get('/user/:id', (req: Request, res: Response,) => {
    const id: string = req.params.id;
    res.json({ user: getUserById(id) });
});

router.get('/userSuggest/:loginSubstring/:limit', (req: Request, res: Response,) => {
    const { loginSubstring, limit }: ParamsDictionary = req.params;
    res.json({ users: getAutoSuggestUsers(loginSubstring, limit) });
});

router.post('/user', (req: Request, res: Response,) => {
    const { login, password, age }: RequestBody = req.body;
    schema.validateAsync({ login, password, age })
        .then(() => {
            addUser(login, password, age);
            res.status(201).send();
        })
        .catch((err: ValidationError) => {
            res.status(400).json({ message: err.message });
        });
});

router.put('/user/:id', (req: Request, res: Response,) => {
    const { login, password, age }: RequestBody = req.body;
    const id: string = req.params.id;

    schema.validateAsync({ login, password, age })
        .then(() => {
            editUser(id, login, password, age);
            res.status(200).send();
        })
        .catch((err: ValidationError) => {
            console.log('err: ', err);
            res.status(400).json({ message: err.message });
        });
});

router.delete('/user/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    deleteUser(id);
    res.status(200).send();
});
