import { authMiddleware } from 'src/middlewares/authMiddleware';

require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from 'src/routes';
import { authRouter } from "src/routes/authRouter";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/api', router);

app.listen(process.env.PORT || 9999, () => {
  console.log('Server is running on port 9999');
});
