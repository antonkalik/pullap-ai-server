import { Router } from 'express';
import { getSuggestionController } from 'src/controllers/suggestion/getSuggestionController';
import { finishLastSuggestionController } from 'src/controllers/suggestion/finishLastSuggestionController';

export const suggestionRouter = Router({ mergeParams: true });

suggestionRouter.get('/', getSuggestionController);
suggestionRouter.post('/finish', finishLastSuggestionController);
