import { Schema, Model, Document, model } from 'mongoose';
import { IPriceListItem, PriceListItem } from './PriceListItem';
import { IProduct, Product } from './Product';
import { Dated, DatedSchema } from './Dated';
import { v1 as uuid } from 'uuid';

export interface IPriceList extends Document, Dated {
    name: string;
    description: string;
    code: string;
    category: string;
    items : IPriceListItem[];
    tags: string;
    addItem(name: string, price: number): Promise<IPriceListItem>
}

export interface IPriceListModel {
    findByNameWithItems(name: string): Promise<IPriceListItem>
}

const priceListSchema = new Schema({...DatedSchema,
    name: {
        type: String,
        required: true
    },
    description: {
       type: String
    },
    code: {
        type: String
    },
    category: {
      type: String
    },
    tags: [{
        type: String
    }]
});

priceListSchema.pre('save', function(next) {
  this.code = uuid();
  next()
});

priceListSchema.static('findByNameWithItems', (name: string) => {
    return new Promise<IPriceList>((resolve, reject) => {
      PriceList.findOne({name: name}, (err,priceList)=>{
        PriceListItem.find({priceList:priceList.id}).exec((err,items)=>{
          let result = priceList.toJSON();
          result['items'] = items.map(e => e.toJSON());
          resolve(result);
        })
      });
    });
});

//WHY BELOW NOT WORKING !?
priceListSchema.virtual('allItems').get(async obj =>
  await PriceListItem.find({priceList:this.id}).exec()
);

priceListSchema.method('addItem', function(productName: string, price :number){
    let self = this;
    return new Promise<IPriceListItem>((resolve,reject) => {
      Product.findOne({name : productName}).exec()
             .then(product => {
                 new PriceListItem({
                   name : product.name +" [ "+self.name+" ]",
                   code : uuid(),
                   priceList: self.id,
                   product: product.id,
                   price : price
                 }).save()
                   .then(item => resolve(item))
                   .catch(err => reject(err));
             })
             .catch(err => reject(err))
    });
});

export type PriceListModel = Model<IPriceList> & IPriceListModel & IPriceList;

export const PriceList: PriceListModel = <PriceListModel>model<IPriceList>("PriceList", priceListSchema);
