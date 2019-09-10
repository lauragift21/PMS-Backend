import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import 'dotenv/config';
import routes from './routes';

const port = (process.env.PORT || 8080);

// initialize express
const app = express();

// Logging middleware to console
app.use(logger('dev'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('api/v1', routes);

const dbUrl = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

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