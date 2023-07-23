require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';

const app  = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

app.listen(9999, async () => {
  console.log('Server is running on port 9999');
});
