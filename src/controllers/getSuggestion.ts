import { Request, Response } from 'express';
import { AxiosError } from 'axios';
// import { openai } from 'src/configs/openai';
import { database } from 'src/database';

export const getSuggestion = async (req: Request, res: Response) => {
  try {
    // const completion = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   prompt: 'How are you today?',
    // });
    const result = await database.select('*').from('user');

    // console.log('result', completion.data);
    console.log('result', result);
    res.json({
      data: 'hi',
    });
  } catch (error: unknown) {
    const errorData = error as AxiosError;
    console.log('error', errorData.response?.data);

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
