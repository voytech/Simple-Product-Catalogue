import {Schema, Model, Document, model} from 'mongoose';
import {IPriceListItem} from './PriceListItem'

export interface IPriceList extends Document {
    name: string;
    description: string;
    code: string;
    category: string;
    items : IPriceListItem[];
    tags: string;
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
    PriceList.findOne({name: name}, callback);
});

export type PriceListModel = Model<IPriceList> & IPriceListModel & IPriceList;

export const PriceList: PriceListModel = <PriceListModel>model<IPriceList>("PriceList", priceListSchema);
