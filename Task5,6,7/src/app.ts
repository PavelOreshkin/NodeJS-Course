import express, { Router, Application } from 'express';
import { dbInit } from './data-access';
import UserController from './controllers/userController';
import GroupController from './controllers/groupController';
import UserGroupController from './controllers/userGroupController';
import { winstoneLogger } from './logger';

export const app: Application = express();
export const router: Router = express.Router();

app.use(express.json());
app.use(winstoneLogger);

app.use('/user', UserController);
app.use('/group', GroupController);
app.use('/userGroup', UserGroupController);

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
