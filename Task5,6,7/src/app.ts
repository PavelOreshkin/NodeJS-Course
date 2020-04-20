require('dotenv').config();
import express, { Router, Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { dbInit } from './data-access';
import UserController from './controllers/userController';
import GroupController from './controllers/groupController';
import UserGroupController from './controllers/userGroupController';
import AuthenticateController from './controllers/authenticateController';
import { winstoneLogger } from './logger';
import { checkToken } from './authenticate';
import { corsOptions } from './config';

export const app: Application = express();
export const router: Router = express.Router();

app.use(express.json());
app.use(winstoneLogger);
app.use(cors(corsOptions));

app.use('/login', AuthenticateController);
app.use(checkToken);
app.use('/user', UserController);
app.use('/group', GroupController);
app.use('/userGroup', UserGroupController);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

dbInit('db success connected');
app.listen(3000, () => console.log('server running'));

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });
