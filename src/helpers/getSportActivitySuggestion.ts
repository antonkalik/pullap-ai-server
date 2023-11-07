import { Indicator, Activity, ActivityDescription } from 'src/@types';
import { activities } from 'src/constants/activities';
import { openai } from 'src/configs/openai';

export async function getSportActivitySuggestion(
  indicator: Indicator,
  lastActivity?: Activity
): Promise<Activity & ActivityDescription> {
  const systemPrompt = `
  You will be provided with indicators
  as age, weight, height, lifestyle
  and previous activity type with
  duration if the exist,
  and your task is to return sports
  activity plan in JSON format depends on those indicators.
  The plan should include the type of activity,
  the duration in minutes, a good description
  of how to do the activity, the recommended
  water consumption in milliliters,
  and the plan like step by step
  what to do during the activity.
  
  Example of the response:
  {
    "activity_type": ${activities.sort(() => Math.random() - 0.5).join(' || ')},
    "duration": 30,
    "description": "A continuous run at a moderate pace to improve cardiovascular endurance.",
    "water_consume": 500
    "distance": 3000,
    "plan: ["First step description", "Second step description", "Third step description"]
  }
  `;

  const lastActivityMessage = lastActivity
    ? `
      - Last activity type: ${lastActivity.activity_type}
      - Last activity duration: ${lastActivity.duration}
      `
    : '';

  const userPrompt = `
  - Age: ${indicator.age}
  - Weight: ${indicator.weight}
  - Height: ${indicator.height}
  - Lifestyle: ${indicator.life_style}
  ${lastActivityMessage}
  `;

  console.log('userPrompt', userPrompt);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.9,
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}
