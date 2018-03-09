import { Product, IProduct, Property } from '../../models/Product';
import { PriceList, IPriceList } from '../../models/PriceList';
import { PriceListItem } from '../../models/PriceListItem';
import { Document } from 'mongoose';

export const sampleProduct = new Product({
      name:'Kitchen Wall Plate 40x25 HOUSESMART',
      code:'001_8829912CD',
      category:'kitchen',
      type:'wall-plate'
});

export const samplePriceList = new PriceList({
      name:'Castorama P1',
      description: 'Castorama Products PriceList',
      code:'001_9929912CD',
      category:'kitchen'
});

export function createSamplePriceListItem(product: IProduct, priceList : IPriceList) :Document {
  return new PriceListItem({
    name:'Kitchen Wall Plate 40x25 HOUSESMART',
    code:'001_9929912CF',
    product : product.id,
    priceList : priceList.id,
    price : 100.99
  });
}

export function createSampleProduct(options : any) : Document{
  return new Product({
        name:'Kitchen Wall Plate 40x25 HOUSESMART' || options.name,
        code:'001_8829912CD' || options.code,
        category:'kitchen' || options.category,
        type:'wall-plate' || options.type
  });
}

export function createSamplePriceList(options : any) : Document {
  return new PriceList({
        name:'Castorama P1'|| options.name,
        description: 'Castorama Products PriceList'|| options.description,
        code:'001_9929912CD' || options.code,
        category:'kitchen' || options.category
  });
}
