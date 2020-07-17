import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;
