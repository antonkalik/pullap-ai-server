import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { openai } from 'src/configs/openai';

export const getSuggestion = async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      prompt: 'How are you today?',
    });
    console.log('data', completion.data);
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
