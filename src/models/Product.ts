import {Schema, Model, Document, model, connection} from 'mongoose';
import * as streamBuffers from 'stream-buffers';
import {binaryCollections, GridFSModel } from '../BinaryCollections'
import {ResourceDescriptorSchema, IResourceDescriptor} from './ResourceDescriptor'
import { v1 as uuid } from 'uuid';

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
    startDate : Date;
    effectiveStartDate : Date;
    endDate : Date;
    effectiveEndDate : Date;
    type: string;
    tags: string[];
    properties : IProperty[];
    images : IResourceDescriptor[];
    attachments : IResourceDescriptor[];
    addProperty(property : IProperty, callback : Function): void
    addTag(tag : string, callback : Function): void
    addImage(imageName: string, imageContent:string, callback : Function):void
    addAttachment(attachmentName : string, attachmentContent:string, callback : Function):void
}

export interface IProductModel {
    createProduct(item: IProduct, callback: Function): void
    all(cllback : Function): void
    findByName(name: string, callback: Function): void
    loadImage(product: IProduct,name: string, callback: Function): void
    loadImages(product: IProduct,callback: Function): void
    loadAttachment(product: IProduct,name: string, callback: Function): void
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
      required: true,
      unique: true
    },
    code: {
      type: String,
      //required: true,
      //unique: true
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
    startDate : {
      type: Schema.Types.Date,
      required : true
    },
    endDate : {
      type: Schema.Types.Date,
      required : true
    },
    effectiveStartDate : {
      type: Schema.Types.Date,
      required : true
    },
    effectiveEndDate : {
      type: Schema.Types.Date,
      required : true
    },
    tags: [{
      type: String
    }],
    images: [{
      type: ResourceDescriptorSchema
    }],
    attachments: [{
      type: ResourceDescriptorSchema
    }],
    properties: [propertySchema]
});

productSchema.pre('save', function(next) {
  this.code = uuid();
  next()
});

productSchema.static('createProduct', (product: IProduct, callback:  (err: any, product: IProduct) => void) => {
    product.save(callback);
});

productSchema.static('findByName', (name: string, callback: Function) => {
    Product.findOne({name: name}, callback);
});

productSchema.static('all', (callback: Function) => {
    Product.find(callback);
});


productSchema.static('withAllPropertiesPopulated',function(name : string, callback : (err: any, product : IProduct) => void){
    Product.findOne({name:name}).populate('properties').exec(callback);
});

productSchema.static('loadImage',function(product: IProduct, filename: string, callback: (err, image) => void){
    let meta = product.images.filter((e)=>e.name = filename);
    binaryCollections.loadResource('Image', meta, callback);
});

productSchema.static('loadImages',function(product: IProduct, callback: (err, images) => void){
    binaryCollections.loadResources('Image', product.images, callback);
});

productSchema.static('loadAttachment',function(product: IProduct, filename: string, callback: (err, attachment) => void){
    let meta = product.attachments.filter((e)=>e.name = filename);
    binaryCollections.loadResource('Attachment', meta, callback);
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
  binaryCollections.addContent('Image', this, imageName, content,(error, createdFile) => {
                                                                    this.images.push({name:imageName, refId:createdFile._id});
                                                                    this.save(callback);
  });
});

productSchema.method('addAttachment',function(attachmentName: string, content : string, callback : (err: any, product: IProduct) => void){
  binaryCollections.addContent('Attachment', this, attachmentName, content,(error, createdFile) => {
                                                                              this.attachments.push({name:attachmentName, refId:createdFile._id});
                                                                              this.save(callback);
  });
});

export type ProductModel = Model<IProduct> & IProductModel & IProduct;
export type PropertyModel = Model<IProperty> & IProperty;

export const Property: PropertyModel = <PropertyModel>model<IProperty>("Property", propertySchema);
export const Product: ProductModel = <ProductModel>model<IProduct>("Product", productSchema);
