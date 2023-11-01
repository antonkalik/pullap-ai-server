import { Router } from 'express';
import { getSuggestionController } from 'src/controllers/suggestion/getSuggestionController';

export const suggestionRouter = Router({ mergeParams: true });

suggestionRouter.get('/', getSuggestionController);
