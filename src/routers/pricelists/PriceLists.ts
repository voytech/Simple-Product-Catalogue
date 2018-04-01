import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { PriceList, IPriceList } from '../../models/PriceList';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'

export class PriceLists extends CRUDRoute<IPriceList> {

    constructor(){
      super(PriceList,'name');
    }

    public fetchPriceListsWithItemsAction(router : Router) : void {
        router.get('/findByNameWithItems',this.restrict(['ADMIN']),(req: Request, res: Response) => {
          PriceList.findByNameWithItems(req.query.name,(err,priceList)=>{
            if (err) return res.status(500).json(err);
            return res.json(priceList);
          })
        })
    }

    public addItemAction(router: Router): void {
        router.post('/addItem',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let payload : {priceList:string, product:string, price:number} = req.body;
            PriceList.findByName(payload.priceList,(err, priceList) => {
              if (err) return res.status(500).json(err);
              if (!priceList) return res.status(500).json('Error')
              priceList.addItem(payload.product,payload.price,(err,result) => {
                if (err) return res.status(500).json(err);
                return res.json(result); // PriceListItem
              })
            });
        });
    }

}
