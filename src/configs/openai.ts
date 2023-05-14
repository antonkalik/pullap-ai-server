const { Configuration, OpenAIApi } = require('openai');

console.log('CONFIGS', process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
