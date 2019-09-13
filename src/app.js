import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes';

const port = (process.env.PORT || 8080);

// initialize express
const app = express();

// Logging middleware to console
app.use(logger('dev'));

// document with swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/', routes);

const dbUrl = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.listen(port, () =>
  console.log(`Welcome to Population Management Application, app listening on port ${port}`),
);

export default app;