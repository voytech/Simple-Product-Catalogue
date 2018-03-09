import { Schema, Model, Document, model } from 'mongoose';
import { IPriceListItem, PriceListItem } from './PriceListItem';
import { IProduct, Product } from './Product';
import { v1 as uuid } from 'uuid';

export interface IPriceList extends Document {
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
}

const priceListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
       type: String
    },
    code: {
        type: String,
        required: true
    },
    category: {
      type: String
    },
    tags: {
        type: String
    }
});


priceListSchema.static('findByName', (name: string, callback: Function) => {
    PriceList.findOne({name: name}, (err,priceList)=>{
      PriceListItem.find({priceList:priceList.id}).exec((err,coll)=>{
        console.log(coll)
        //priceList.items.push(coll);
        callback(priceList);
      })
    });
});

priceListSchema.method('addItem', function(productName: string, price :number, callback: (err,priceListItem)=>void){
    Product.findByName(productName,function(err, product){
      let item : IPriceListItem = new PriceListItem({
        name : product.name +" [ "+this.name+" ]",
        code : uuid(),
        priceList: this.id,
        product: product.id,
        price : price
      });
      item.save(callback);
    });
});

export type PriceListModel = Model<IPriceList> & IPriceListModel & IPriceList;

export const PriceList: PriceListModel = <PriceListModel>model<IPriceList>("PriceList", priceListSchema);
