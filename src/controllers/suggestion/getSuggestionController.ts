import { Request, Response } from 'express';
import { openai } from 'src/configs/openai';
import { IndicatorModel } from 'src/models/IndicatorModel';
import { Indicator } from 'src/@types';

const json_run = {
  distance: 'number in meters',
  time: 'number in minutes',
  water: 'number in milligrams',
  calories: 'number will burn calories',
};

async function getSportActivitySuggestion(indicator: Indicator, target: number) {
  const today = new Date();
  const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const prompt = `
    Calculate a suggested run activity for today for an ${
      indicator.age
    }-year-old individual weighing ${indicator.weight} kg, with a ${
      indicator.life_style
    } lifestyle, a height of ${indicator.height} cm, and a recent running session of ${
      indicator.run_distance
    } meters in ${indicator.run_time} seconds with an average heart rate of ${
      indicator.run_heart_rate
    } bpm. The goal is to lose approximately ${
      target / daysInCurrentMonth
    } kg today, contributing to a monthly weight loss target of ${target} kg.
  `;
  const userPrompt = `
    - Use the information provided to suggest a safe and effective run.
    - Estimate the run distance in meters, time required in minutes, and appropriate running pace.
    - Calculate the water intake in ml recommended for hydration during the run.
    - Calculate the approximate number of calories that will be burned during this run.
    - All results should be a number.
    - Provide the response in JSON format with keys for distance, time, water, and calories.
  `;

  console.log(prompt);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: userPrompt },
      { role: 'system', content: `
        example: of how the response should look like: ${JSON.stringify(json_run)}
      ` },
    ],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices.map(choice => JSON.parse(choice.message.content || '{}'));
}

export const getSuggestionController = async (req: Request, res: Response) => {
  try {
    const [indicator] = await IndicatorModel.findAllByUserId(req.user.id);
    const result = await getSportActivitySuggestion(indicator, 2);

    res.json({
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
