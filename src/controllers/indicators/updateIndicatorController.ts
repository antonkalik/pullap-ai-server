import { Request, Response } from 'express';
import { IndicatorModel } from 'src/models/IndicatorModel';

export const updateIndicatorController = async (req: Request, res: Response) => {
  try {
    const { id } = await IndicatorModel.updateByUserId(req.user.id, {
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      life_style: req.body.life_style,
    });

    res.json({
      id,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
