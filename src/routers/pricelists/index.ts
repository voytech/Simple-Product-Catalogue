/**
 * products router
 */
import * as express from 'express';
import { PriceLists } from './PriceLists';

const priceLists = express.Router();

priceLists.use('/', new PriceLists().getRoutes());

export default priceLists;
