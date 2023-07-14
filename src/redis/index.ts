require('dotenv').config({
  path: '../../.env',
});
import * as redis from 'redis';

const redisClient = redis.createClient({
  url: 'redis://localhost:6379/1',
});

redisClient.on('error', error => console.error('Redis Client Error', error));

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error(`Could not connect to Redis: ${err}`);
    process.exit(1); // Exit the process with a "failure" code
  }
};

const disconnectFromRedis = async () => {
  try {
    await redisClient.disconnect();
    console.log('Disconnected from Redis');
  } catch (err) {
    console.error(`Could not disconnect from Redis: ${err}`);
  }
};

export { redisClient, connectToRedis, disconnectFromRedis };
