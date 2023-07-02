import { Router } from 'express';
import { suggestionController } from 'src/controllers/suggestionController';
import { sessionController } from 'src/controllers/sessionController';
import { authMiddleware } from 'src/middlewares/authMiddleware';

export const apiRouter = Router();

apiRouter.use(authMiddleware);
apiRouter.get('/suggestion', suggestionController);
apiRouter.get('/session', sessionController);
