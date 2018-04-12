/**
 * application main router
 */
import * as express from 'express';

import {default as userRouter} from './user';
import {default as productsRouter} from './products';
import {default as priceListsRouter} from './pricelists';
import {default as categoriesRouter } from './categories';

const api = express.Router();

api.use('/user', userRouter);
api.use('/products', productsRouter);
api.use('/pricelists', priceListsRouter);
api.use('/categories', categoriesRouter);

export default api;
