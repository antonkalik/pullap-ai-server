import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { AxiosError } from 'axios';
import { filterObject } from 'src/helpers/filterObject';

export const updateUserController = async (req: Request, res: Response) => {
  const user = req['user'];
  const { first_name, last_name, country_code, phone, address } = req.body;
  const payload = filterObject({
    first_name,
    last_name,
    country_code,
    phone,
    address,
  });

  try {
    const updatedUser = await UserModel.update(user.id, payload);
    res.json({
      data: updatedUser,
    });
  } catch (error) {
    const errorData = error as AxiosError;
    console.log('error', errorData.response);

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
