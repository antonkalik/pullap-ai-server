import { Request, Response } from 'express';

export const updateUserController = (req: Request, res: Response) => {
  res.json({
    data: 'update user',
  });
};
