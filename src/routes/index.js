import express from 'express';
import Population from '../controllers/PopulationControllers';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send({message: 'Welcome to Population Management System API'});
});
routes.get('/locations', Population.getLocations);
routes.post('/locations', Population.createLocation);
routes.get('/locations/:id', Population.getOneLocation);
routes.put('/locations/:id', Population.updateLocation);
// routes.delete('/locations/:id', Population.deleteLocation);

routes.all('*', (req, res) => {
  res.status(404).send({ message: 'You\'ve hit a wrong endpoint, this endpoint does not exist'});
});


export default routes;