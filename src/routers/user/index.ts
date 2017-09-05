/**
 * user router
 */
import * as express from 'express';
const user = express.Router();
import {Auth} from './Auth';

user.use('/auth', new Auth().getRoutes());

export default user;