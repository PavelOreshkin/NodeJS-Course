import express, { Router, Application, Request, Response, NextFunction } from 'express';
// import { db } from './db/db';
import { deleteUser, addUser, isUserExist } from './helpers';
import { RequestBody } from './types';
const app: Application = express();
const router: Router = express.Router();

app.listen(3000, () => console.log('server running'));

app.use(express.json());
app.use('/', router);

router.param('id', (req: Request, res: Response, next: NextFunction, id: string) => {
  if(isUserExist(id)) {
    next();
  } else {
    res.status(404).json({ message: `User with id=${id} not found` });
  }
})

//getUserById :id
// router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
//   console.log('req: ', req.body);
//   res.json({ answer: 'all good get' });
// })

router.post('/user', (req: Request, res: Response, next: NextFunction) => {
  const { login, password, age }: RequestBody = req.body;
  addUser(login, password, age)
  res.status(201).send();
})

//editUser :id
// router.put('/user/:id', (req: Request, res: Response, next: NextFunction) => {
//   console.log('req: ', req.body);
//   res.json({ answer: 'all good put' });
// })

router.delete('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  deleteUser(id);
  res.status(200).send();
})

// getAutoSuggestUsers(loginSubstring, limit)
// sortet by login and filtered by loginSubstring
