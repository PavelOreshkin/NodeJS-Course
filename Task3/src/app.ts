import express, { Router, Application } from 'express';
import { UserController } from './controllers';
import { dbInit } from './data-access';

export const app: Application = express();
export const router: Router = express.Router();

app.use(express.json());
app.use('/', router);

UserController(router);

dbInit('db success connected');
app.listen(3000, () => console.log('server running'));
