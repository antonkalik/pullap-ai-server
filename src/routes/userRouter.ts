import { Router } from 'express';
import { updateUserController } from 'src/controllers/user/updateUserController';
import { deleteUserController } from 'src/controllers/user/deleteUserController';
import { logoutController } from 'src/controllers/user/logoutController';

export const userRouter = Router();

userRouter.patch('/', updateUserController);
userRouter.delete('/', deleteUserController);
userRouter.post('/logout', logoutController);
