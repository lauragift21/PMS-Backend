import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import 'dotenv/config';

const port = (process.env.PORT || 8080);

// initialize express
const app = express();

app.use(cors());

// Logging middleware to console
app.use(logger('dev'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({message: 'Welcome to Population Management System API'});
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'You\'ve hit a wrong endpoint, this endpoint does not exist'});
});

app.listen(port, () =>
  console.log(`Welcome to Population Management Application, app listening on port ${port}`),
);

export default app;