import { Request, Response } from 'express';
import { ActivityModel } from 'src/models/ActivityModel';

export const finishLastSuggestionController = async (req: Request, res: Response) => {
  try {
    const [lastActivity] = await ActivityModel.findAllByUserId(req.user.id);
    await ActivityModel.updateOneById(lastActivity.id, {
      is_completed: true,
    });

    res.json({
      id: lastActivity.id,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
