import express, { Router } from 'express';
import { app } from '../app';
import { getUserById, getAutoSuggestUsers, addUser, editUser, deleteUser, isUserExist } from '../services/appServices';
const router: Router = express.Router();

export const UserController = () => {
    app.use(express.json());
    app.use('/', router);

    router.param('id', isUserExist);
    router.get('/user/:id', getUserById);
    router.get('/userSuggest', getAutoSuggestUsers);
    router.post('/user', addUser);
    router.put('/user/:id', editUser);
    router.delete('/user/:id', deleteUser);
};
