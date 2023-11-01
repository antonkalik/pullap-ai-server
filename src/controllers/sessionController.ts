import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';
import { NotFoundError } from 'src/constants/errors';

export const sessionController = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOneById<User>(req.user.id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        error: NotFoundError,
      });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
