import express, {Router, Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
const router: Router = express.Router();

app.listen(3000, () => console.log('server running'));

app.use(express.json());
app.use('/', router);

//getUserById :id
router.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('req: ', req.body);
  res.json({ answer: 'all good' });
})

// addUser
router.post('/user', (req: Request, res: Response, next: NextFunction) => {
  console.log('req: ', req.body);
  res.json({ answer: 'all good' });
})

//editUser :id
router.put('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('req: ', req.body);
  res.json({ answer: 'all good' });
})

//deleteUser :id
router.delete('/user/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('req: ', req.body);
  res.json({ answer: 'all good' });
})

// getAutoSuggestUsers(loginSubstring, limit)
// sortet by login and filtered by loginSubstring
