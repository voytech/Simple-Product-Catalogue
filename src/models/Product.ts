import {Schema, Model, Document, model, connection} from 'mongoose';
import * as streamBuffers from 'stream-buffers';
import {binaryCollections, GridFSModel } from '../BinaryCollections'
import app from '../App';
let ObjectId =  Schema.Types.ObjectId;

export interface IProperty extends Document{
  name : string;
  value : string;
}

export interface IProduct extends Document {
    name: string;
    code: string;
    category : string;
    description: string;
    type: string;
    tags: string[];
    properties : IProperty[];
    images : string[];
    attachments : string[];
    addProperty(property : IProperty, callback : Function): void
    addTag(tag : string, callback : Function): void
    addImage(imageName: string, imageContent:string, callback : Function):void
    addAttachment(attachmentName : string, attachmentContent:string, callback : Function):void
}

export interface IProductModel {
    createProduct(item: IProduct, callback: Function): void
    findByName(name: string, callback: Function): void
}

const propertySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
});

const productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    description : {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    category : {
      type: String,
      required : true
    },
    tags: [{
      type: String
    }],
    images: [{
      type: String
    }],
    attachments: [{
      type: String
    }],
    properties: [propertySchema]
});

productSchema.static('createProduct', (product: IProduct, callback:  (err: any, product: IProduct) => void) => {
    product.save(callback);
});

productSchema.static('findByName', (name: string, callback: Function) => {
    Product.findOne({name: name}, callback);
});

productSchema.static('withAllPropertiesPopulated',function(name : string, callback : (err: any, product : IProduct) => void){
    Product.findOne({name:name}).populate('properties').exec(callback);
});

productSchema.method('addProperty',function(property : IProperty, callback : (err: any, product: IProduct) => void){
  this.properties.push(property);
  this.save(callback);
});

productSchema.method('addTag',function(tag : string, callback : (err: any, product: IProduct) => void){
  this.tags.push(tag);
  this.save(callback);
});

productSchema.method('addImage',function(imageName: string, content : string, callback : (err: any, product: IProduct) => void){
  let readableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
	    frequency: 10,
	    chunkSize: 2048
  });
  readableStreamBuffer.put(content);
  let Image = binaryCollections.getBinaryCollection('Image','images');
  Image.write({
      filename: imageName,
      contentType:'text/plain'
    },
    readableStreamBuffer,
    (error, createdFile) => {
        console.info("MongoDB Binary Document Has Been Created ...");
        console.info(createdFile);
    }
  );
  this.images.push(imageName);
  this.save(callback);
});

productSchema.method('addAttachment',function(attachmentName: String, content : string, callback : (err: any, product: IProduct) => void){
  let readableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
	    frequency: 10,
	    chunkSize: 2048
  });
  readableStreamBuffer.put(content);
  let Attachment = binaryCollections.getBinaryCollection('Attachment','attachments');
  Attachment.write({
      filename: attachmentName,
      contentType:'text/plain'
    },
    readableStreamBuffer,
    (error, createdFile) => {
        console.info("MongoDB Binary Document Has Been Created ...");
        console.info(createdFile);
    }
  );
  this.attachments.push(attachmentName);
  this.save(callback);
});

export type ProductModel = Model<IProduct> & IProductModel & IProduct;
export type PropertyModel = Model<IProperty> & IProperty;

export const Property: PropertyModel = <PropertyModel>model<IProperty>("Property", propertySchema);
export const Product: ProductModel = <ProductModel>model<IProduct>("Product", productSchema);
