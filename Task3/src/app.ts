import express, { Application } from 'express';
import { UserController } from './controllers/controller';

export const app: Application = express();

app.listen(3000, () => console.log('server running'));

UserController();
