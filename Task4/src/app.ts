import express, { Router, Application } from 'express';
import { UserController } from './controllers/userController';
import { dbInit } from './data-access';
import { GroupController } from './controllers/groupController';
import { UserGroupController } from './controllers/userGroupController';

export const app: Application = express();
export const router: Router = express.Router();

app.use(express.json());
app.use('/', router);

UserController(router);
GroupController(router);
UserGroupController(router);

dbInit('db success connected');
app.listen(3000, () => console.log('server running'));
