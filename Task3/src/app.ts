import express, { Router, Application } from 'express';
import { UserController } from './controllers/controller';
export const app: Application = express();
export const router: Router = express.Router();

app.listen(3000, () => console.log('server running'));
app.use(express.json());
app.use('/', router);

UserController();
