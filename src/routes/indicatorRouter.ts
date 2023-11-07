import { Router } from 'express';
import { updateIndicatorController } from 'src/controllers/indicators/updateIndicatorController';

export const indicatorRouter = Router({ mergeParams: true });

indicatorRouter.post('/', updateIndicatorController);
