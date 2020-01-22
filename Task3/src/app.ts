import express, { Router, Application } from 'express';
import { getUserById, getAutoSuggestUsers, addUser, editUser, deleteUser, isUserExist } from './appServices';

const app: Application = express();
const router: Router = express.Router();

app.listen(3000, () => console.log('server running'));

app.use(express.json());
app.use('/', router);

router.param('id', isUserExist);
router.get('/', (req: any, res: any) => {
    res.end('<h1>Hellow Paul</h1>');
});
router.get('/user/:id', getUserById);
router.get('/userSuggest', getAutoSuggestUsers);
router.post('/user', addUser);
router.put('/user/:id', editUser);
router.delete('/user/:id', deleteUser);




// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('postgres://postgres:@localhost:5432/task3');

// sequelize.authenticate()
//     .then(() => console.log('okey'));
