import process from 'process';

require('dotenv').config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';
import { connectToRedis, disconnectFromRedis } from 'src/redis';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

const server = app.listen(process.env.PORT || 9999, async () => {
  try {
    console.log('All is ready. Server is running on port 9999');
    await connectToRedis();
  } catch (error) {
    server.close();
    console.error(error);
    process.exit(1);
  }
});

async function shutDown() {
  try {
    await disconnectFromRedis();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
