import express, { Router, Application } from 'express';
import { dbInit } from './data-access';
import { verifyEntityExistence } from './validations';

// import { UserController } from './controllers/userController';
// import { GroupController } from './controllers/groupController';
// import { UserGroupController } from './controllers/userGroupController';

import UserController from './controllers/userController';
import GroupController from './controllers/groupController';
import UserGroupController from './controllers/userGroupController';

export const app: Application = express();
export const router: Router = express.Router();

app.use(express.json());
// app.use('/', router);

router.param('id', verifyEntityExistence);

// app.use('/user', UserController);

app.use('/', [UserController, GroupController, UserGroupController]);

// UserController(router);
// GroupController(router);
// UserGroupController(router);

dbInit('db success connected');
app.listen(3000, () => console.log('server running'));
