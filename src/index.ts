import * as process from 'process';
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';
import { connectToRedis } from 'src/redis';

const app = express();
const PORT = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

(async () => {
  try {
    await connectToRedis();

    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
