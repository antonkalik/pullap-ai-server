import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { filterObject } from 'src/utils/filterObject';
import { InvalidRequestError } from 'src/constants/errors';

type Payload = {
  first_name?: string;
  last_name?: string;
  username?: string;
};

export const updateUserController = async (req: Request, res: Response) => {
  const { first_name, last_name, username } = req.body;
  const payload: Payload = filterObject({
    first_name,
    last_name,
    username,
  });

  try {
    const existingUserName = await UserModel.findByUsername(username);

    if (existingUserName) {
      return res.status(403).json({
        error: InvalidRequestError,
      });
    }

    const updatedUser = await UserModel.updateOneById<typeof payload>(req.user.id, payload);
    res.json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};
