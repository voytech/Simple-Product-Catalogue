import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { PriceList, IPriceList } from '../../models/PriceList';
import { PriceListService } from '../../services/pricelists/PriceListService';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'
import {Model} from 'mongoose';

export class PriceLists extends CRUDRoute<IPriceList,PriceListService> {

    constructor(){
      super(PriceList,'name',[]);
    }

    createService(model : Model<IPriceList>,identityField : string) : PriceListService{
      return new PriceListService(model,identityField);
    }

    public fetchPriceListsWithItemsAction(router : Router) : void {
        router.get('/findByNameWithItems',this.restrict(['ADMIN']),(req: Request, res: Response) => {
          this.service.fetchPriceListsWithItems(req.query.name)
                      .then(priceList => res.json(priceList))
                      .catch(err => res.status(500).json(err))
        })
    }

    public addItemAction(router: Router): void {
        router.post('/addItem',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let payload : {priceList:string, product:string, price:number} = req.body;
            this.service.addItem(payload.priceList,payload.product,payload.price)
                        .then(item => res.json(item))
                        .catch(err => res.status(500).json(err))
        });
    }
}
