import { Request, Response } from 'express';
import { openai } from 'src/configs/openai';
import { IndicatorModel } from 'src/models/IndicatorModel';
import { Indicator } from 'src/@types';

const json_prompt = {
  day: Date,
  food: [
    {
      id: 'food_id',
      name: 'breakfast',
      items: [
        {
          name: 'eggs',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'bread',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'milk',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
      ],
      description: 'description of how this breakfast will affect your body',
      calories: 100,
      protein: 10,
      fat: 10,
      carbohydrates: 10,
    },
    {
      id: 'food_id',
      name: 'lunch',
      items: [
        {
          name: 'eggs',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'bread',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'milk',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
      ],
      description: 'description of how this lunch will affect your body',
      calories: 100,
      protein: 10,
      fat: 10,
      carbohydrates: 10,
    },
    {
      id: 'food_id',
      name: 'dinner',
      items: [
        {
          name: 'eggs',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'bread',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
        {
          name: 'milk',
          recipe_description: 'description of recipe or what it is about',
          recipe_items: ['description of recipe item 1', 'description of recipe item 2'],
          url_recipe: 'https://example.com',
          url_image: 'https://example.com',
        },
      ],
      description: 'description of how this dinner will affect your body',
      calories: 100,
      protein: 10,
      fat: 10,
      carbohydrates: 10,
    },
  ],
  activities: [
    {
      id: 'activity_id',
      name: 'running',
      description: 'description of how this activity will affect your body',
      calories: 200,
      distance: 10,
      sets: [],
    },
    {
      id: 'activity_id',
      name: 'push-ups',
      description: 'description of how this activity will affect your body',
      calories: 500,
      sets: [20, 10, 10, 5],
    },
    {
      id: 'activity_id',
      name: 'pull-ups',
      description: 'description of how this activity will affect your body',
      calories: 300,
      sets: [10, 5, 5, 5],
    },
  ],
  plan: [
    {
      time: Date,
      id: 'activity_id or food_id',
    },
    {
      time: Date,
      id: 'activity_id or food_id',
    },
  ],
  description: 'description of how this day will affect your body',
};

async function getSportActivitySuggestion(indicator: Indicator, target: number) {
  const today = new Date();
  const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const prompt = `
    Based on the following indicators:
    - Age: ${indicator.age}
    - Weight: ${indicator.weight} kg
    - LifeStyle over the last 3 years: ${indicator.life_style}
    - Height: ${indicator.height} cm
    - Current run distance: ${indicator.run_distance} meters
    - Current run time: ${indicator.run_time} seconds
    - Current run pace: ${indicator.run_pace} seconds
    - Current run heart rate: ${indicator.run_heart_rate} bpm
    - Target for this month: ${target} kg
    - Target for today: ${target / daysInCurrentMonth} kg

    Suggest a sports activity plan and food plan for today in order to lose ${
      target / daysInCurrentMonth
    } kg.
    The result for day has to be as a JSON format like this: ${JSON.stringify(
      json_prompt,
      null,
      2
    )}
    Do description properly for each food and activity.
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0].message.content;
}

export const getSuggestionController = async (req: Request, res: Response) => {
  try {
    const [indicator] = await IndicatorModel.findAllByUserId(req.user.id);
    const result = await getSportActivitySuggestion(indicator, 2);

    res.json({
      data: JSON.parse(result || '{}'),
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
