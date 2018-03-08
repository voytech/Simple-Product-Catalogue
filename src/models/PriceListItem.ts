import {Schema, Model, Document, model} from 'mongoose';

export interface IPriceListItem extends Document {
    name: string;
    code: string;
    productRef : string;
    description: string;
    price: string;
    tags: string;
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
    productRef: {
       type: Schema.Types.ObjectId, // needs to be subdomain
       ref: 'Product',
       required: true
    },
    description : {
       type: String
    },
    price: {
        type: String,
        required: true
    },
    tags: {
        type: String
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
