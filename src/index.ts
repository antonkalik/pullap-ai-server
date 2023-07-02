require('dotenv').config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

app.listen(process.env.PORT || 9999, () => {
  console.log('Server is running on port 9999');
});
