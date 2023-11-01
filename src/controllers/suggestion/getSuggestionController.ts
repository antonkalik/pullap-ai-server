import { Request, Response } from 'express';
import { openai } from 'src/configs/openai';
import { IndicatorModel } from 'src/models/IndicatorModel';

// async function getSportActivitySuggestion(data) {
//   const prompt = `
//     Based on the following information:
//     - Age: ${data.age}
//     - Weight: ${data.weight} kg
//     - Lifestyle over the last 3 years: ${data.life_style}
//     - Height: ${data.height} cm
//     - Current run distance: ${data.current_run_distance} km
//
//     Suggest a sports activity plan for a week.
//   `;
//
//   const response = await openai.complete({
//     prompt: prompt,
//     max_tokens: 200,
//   });
//
//   return response.choices[0].text.trim();
// }

export const getSuggestionController = async (req: Request, res: Response) => {
  try {
    // const result = await database
    //   .select('age', 'weight', 'height', 'user_id')
    //   .from('user')
    //   .join('indicator', 'user.id', '=', 'indicator.user_id');

    //   const prompt = `
    //   Based on the following information:
    //   - Age: ${data.age}
    //   - Weight: ${data.weight} kg
    //   - Lifestyle over the last 3 years: ${data.life_style}
    //   - Height: ${data.height} cm
    //   - Current run distance: ${data.current_run_distance} km
    //
    //   Suggest a sports activity plan for a week.
    // `;

    // const completion = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   prompt: 'How are you today?',
    // });

    // console.log('result', completion.data);
    // console.log('result', result);

    const data = await IndicatorModel.findAllByUserId(req.user.id);

    // const chatCompletion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: 'Say this is a test' }],
    //   model: 'gpt-3.5-turbo',
    //   max_tokens: 5,
    // });
    //
    // console.log(chatCompletion.choices);

    res.json({
      data: data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
