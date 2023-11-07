import { Request, Response } from 'express';
import { IndicatorModel } from 'src/models/IndicatorModel';
import { getSportActivitySuggestion } from 'src/helpers/getSportActivitySuggestion';

export const getSuggestionController = async (req: Request, res: Response) => {
  try {
    const [indicator] = await IndicatorModel.findAllByUserId(req.user.id);
    const result = await getSportActivitySuggestion(indicator);

    res.json({
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
