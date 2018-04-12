/**
 * products router
 */
import * as express from 'express';
import { Categories } from './Categories';

const categories = express.Router();

categories.use('/', new Categories().getRoutes());

export default categories;
