import { Router } from 'express';
import { getSuggestion } from 'src/controllers/getSuggestion';

export const router = Router();

router.get('/suggestion', getSuggestion);
