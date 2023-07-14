import { Router } from 'express';
import { signUpController } from 'src/controllers/signUpController';
import { loginController } from 'src/controllers/loginController';
import { logoutController } from 'src/controllers/logoutController';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);



