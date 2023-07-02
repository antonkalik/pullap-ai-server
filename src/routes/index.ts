import { Router } from 'express';
import { authRouter } from 'src/routes/authRouter';
import { apiRouter } from 'src/routes/apiRouter';
import { healthController } from 'src/controllers/healthController'

export const router = Router();

router.get('/health', healthController);
router.use('/auth', authRouter);
router.use(apiRouter);
