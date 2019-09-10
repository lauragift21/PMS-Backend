import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Population Management System API');
});

app.listen(process.env.PORT, () =>
  console.log(`app listening on port ${process.env.PORT}`),
);
