import { IPriceList, PriceList } from '../../models/PriceList'
import { Resource, IResource } from '../../models/Resource'
import {Schema, Model, Document, model, connection} from 'mongoose';

import { BaseCRUDService } from '../BaseCRUDService'

export class PriceListService extends BaseCRUDService<IPriceList>{

  constructor(model: Model<IPriceList>, identityField : string){
    super(model,identityField)
  }

  public fetchPriceListsWithItems(name: string) {
      return PriceList.findByNameWithItems(name)
  }

  public addItem(priceList: string, product: string, price: number){
      return this.getByIdentityField(priceList)
                 .then(result => { return result.addItem(product,price)} )
  }

}
