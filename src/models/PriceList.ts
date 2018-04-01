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
    addItem(name: string, price: number, callback: Function): void
}

export interface IPriceListModel {
    findByName(name: string, callback: Function): void
    findByNameWithItems(name: string, callback: Function): void
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

priceListSchema.static('findByName', (name: string, callback: Function) => {
    PriceList.findOne({name: name},callback);
});

priceListSchema.static('findByNameWithItems', (name: string, callback: Function) => {
    PriceList.findOne({name: name}, (err,priceList)=>{
      PriceListItem.find({priceList:priceList.id}).exec((err,coll)=>{
        let result = priceList.toJSON();
        result['items'] = coll.map(e => e.toJSON());
        callback(err,result);
      })
    });
});

//WHY BELOW NOT WORKING !?
priceListSchema.virtual('allItems').get(async obj =>
  await PriceListItem.find({priceList:this.id}).exec()
);

priceListSchema.method('addItem', function(productName: string, price :number, callback: (err,priceListItem)=>void){
    let self = this;
    Product.findByName(productName,function(err, product){
      let item : IPriceListItem = new PriceListItem({
        name : product.name +" [ "+self.name+" ]",
        code : uuid(),
        priceList: self.id,
        product: product.id,
        price : price
      });
      item.save(callback);
    });
});

export type PriceListModel = Model<IPriceList> & IPriceListModel & IPriceList;

export const PriceList: PriceListModel = <PriceListModel>model<IPriceList>("PriceList", priceListSchema);
