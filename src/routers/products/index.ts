/**
 * products router
 */
import * as express from 'express';
import { Products } from './Products';

const products = express.Router();

products.use('/products', new Products().getRoutes());

export default products;
