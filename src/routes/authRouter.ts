import { Router } from 'express';
import { signUp } from 'src/controllers/signUp';
import { login } from 'src/controllers/login';

export const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
