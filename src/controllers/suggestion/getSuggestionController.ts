import { Request, Response } from 'express';
import { IndicatorModel } from 'src/models/IndicatorModel';
import { ActivityModel } from 'src/models/ActivityModel';
import { getSportActivitySuggestion } from 'src/helpers/getSportActivitySuggestion';

export const getSuggestionController = async (req: Request, res: Response) => {
  try {
    const [indicator] = await IndicatorModel.findAllByUserId(req.user.id);
    const [lastActivity] = await ActivityModel.findAllByUserId(req.user.id);

    if (lastActivity && !lastActivity.is_completed) {
      res.json({
        data: lastActivity,
      });
      return;
    }

    const result = await getSportActivitySuggestion(indicator, lastActivity);

    await ActivityModel.insert({
      activity_type: result.activity_type,
      duration: result.duration,
      is_completed: false,
      user_id: req.user.id,
    });

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
