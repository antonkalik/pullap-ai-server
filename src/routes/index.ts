import { Router } from 'express';
import { authRouter } from 'src/routes/authRouter';
import { healthController } from 'src/controllers/healthController';
import { sessionController } from 'src/controllers/sessionController';
import { authMiddleware } from 'src/middlewares/authMiddleware';
import { userRouter } from 'src/routes/userRouter';
import { suggestionRouter } from "src/routes/suggestionRouter";

export const router = Router({ mergeParams: true });

router.get('/health', healthController);
router.use('/auth', authRouter);
router.use(authMiddleware);
router.get('/session', sessionController);
router.use('/user', userRouter);
router.use('/suggestion', suggestionRouter);
