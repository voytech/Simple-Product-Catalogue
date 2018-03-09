import {Schema, Model, Document, model} from 'mongoose';

export interface IPriceListItem extends Document {
    name: string;
    code: string;
    product : string;
    priceList : Schema.Types.ObjectId;
    price: number;
}

export interface IPriceListItemModel {
    createItem(item: IPriceListItem, callback: Function): void
    findByname(name: string, callback: Function): void
}

const priceListItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    product: {
       type: Schema.Types.ObjectId,
       ref: 'Product',
       required: true
    },
    priceList : {
      type: Schema.Types.ObjectId,
      ref: 'PriceList',
      required: true
    },
    price: {
        type: Number,
        required: true
    }
});

priceListItemSchema.static('createItem', (priceListItem: IPriceListItem, callback:  (err: any, product: IPriceListItem) => void) => {
    priceListItem.save(callback);
});

priceListItemSchema.static('findByName', (name: string, callback: Function) => {
    PriceListItem.findOne({name: name}, callback);
});

export type PriceListItemModel = Model<IPriceListItem> & IPriceListItemModel & IPriceListItem;

export const PriceListItem: PriceListItemModel = <PriceListItemModel>model<IPriceListItem>("PriceListItem", priceListItemSchema);
