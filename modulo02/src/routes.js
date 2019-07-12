import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Jackson Santana',
    email: 'jack.rsantana@gmail.com',
    password_hash: '1238712387',
  });

  res.json(user);
});

export default routes;
