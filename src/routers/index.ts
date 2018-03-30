/**
 * application main router
 */
import * as express from 'express';

import {default as userRouter} from './user';
import {default as productsRouter} from './products';
import {default as priceListsRouter} from './pricelists';

const api = express.Router();

api.use('/user', userRouter);
api.use('/products', productsRouter);
api.use('/pricelists', priceListsRouter);

export default api;
