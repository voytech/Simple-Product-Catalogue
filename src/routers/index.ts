/**
 * application main router
 */
import * as express from 'express';

import {default as userRouter} from './user';
import {default as productsRouter} from './products';

const api = express.Router();

api.use('/user', userRouter);
api.use('/products', productsRouter);

export default api;
