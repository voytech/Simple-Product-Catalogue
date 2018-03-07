import {Schema, Model, Document, model} from 'mongoose';

let ObjectId =  Schema.Types.ObjectId;

export interface IProperty extends Document{
  name : string;
  value : string;
}

export interface IProduct extends Document {
    name: string;
    code: string;
    description: string;
    type: string;
    tags: string;
    properties : IProperty[];
}

export interface IProductModel {
    createItem(item: IProduct, callback: Function): void
    findByname(name: string, callback: Function): void
    addProperty(name : string, property : IProperty) :void
}

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description : {
      type: String
    },
    type: {
        type: String,
        required: true
    },
    tags: {
        type: String
    }
});

productSchema.method('addProperty',()=>{});

productSchema.static('createItem', (product: IProduct, callback:  (err: any, product: IProduct, numAffected: number) => void) => {
    product.save(callback);
});

productSchema.static('findByName', (name: string, callback: Function) => {
    Product.findOne({name: name}, callback);
});

export type ProductModel = Model<IProduct> & IProductModel & IProduct;

export const Product: ProductModel = <ProductModel>model<IProduct>("Product", productSchema);
