import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

