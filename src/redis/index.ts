require('dotenv').config({
  path: '../../.env',
});
import process from 'process';
import * as Redis from 'redis';

const redisClient = Redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('error', error => console.error('Redis Client Error', error));

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error(`Could not connect to Redis: ${err}`);
    process.exit(1);
  }
};

export { redisClient, connectToRedis };
