import { Request, Response } from 'express';

export const deleteUserController = (req: Request, res: Response) => {
  res.json({
    data: 'delete user',
  });
};
