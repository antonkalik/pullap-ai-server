import { Request, Response } from 'express';
import { AxiosError } from 'axios';

export const sessionController = async (req: Request, res: Response) => {
  try {
    res.json({
      data: req['user'],
    });
  } catch (error: unknown) {
    const errorData = error as AxiosError;
    console.log('error', errorData.response?.data);

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
