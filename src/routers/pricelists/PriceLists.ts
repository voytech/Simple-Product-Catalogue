import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { PriceList, IPriceList } from '../../models/PriceList';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'

export class PriceListsRoute extends CRUDRoute<IPriceList> {

    constructor(){
      super(PriceList);
    }

}
