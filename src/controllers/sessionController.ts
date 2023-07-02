import { Request, Response } from 'express';

export const sessionController = async (req: Request, res: Response) => {
  res.json({
    data: req['user'] || null,
  });
};
