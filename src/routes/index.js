import express from 'express';
import { createValidator } from 'express-joi-validation';
import Population from '../controllers/PopulationControllers';
import schema from '../middlewares/validator';
const routes = express.Router();

const validator = createValidator();

routes.get('/', (req, res) => {
  res.status(200).send({message: 'Welcome to Population Management System API'});
});
routes.get('/locations',  Population.getLocations);
routes.post('/locations', validator.body(schema.location), Population.createLocation);
routes.get('/locations/:id', Population.getOneLocation);
routes.put('/locations/:id', validator.body(schema.location), Population.updateLocation);
routes.delete('/locations/:id', Population.deleteLocation);

routes.all('*', (req, res) => {
  res.status(404).send({ message: 'You\'ve hit a wrong endpoint, this endpoint does not exist'});
});


export default routes;