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


export interface IPriceList extends Document {
    name: string;
    code: string;
    items : IPriceListItem[];
    tags: string;
}

export interface IPriceListModel {
    createPriceList(item: IPriceList, callback: Function): void
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
       type: String, // needs to be subdomain
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

const priceListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    items: [priceListItemSchema],
    tags: {
        type: String
    }
});

priceListSchema.static('createPriceList', (priceList: IPriceList, callback:  (err: any, product: IPriceList) => void) => {
    priceList.save(callback);
});

priceListSchema.static('findByName', (name: string, callback: Function) => {
    PriceList.findOne({name: name}, callback);
});

export type PriceListItemModel = Model<IPriceListItem> & IPriceListItemModel & IPriceListItem;

export const PriceListItem: PriceListItemModel = <PriceListItemModel>model<IPriceListItem>("PriceListItem", priceListItemSchema);

export type PriceListModel = Model<IPriceList> & IPriceListModel & IPriceList;

export const PriceList: PriceListModel = <PriceListModel>model<IPriceList>("PriceList", priceListSchema);
