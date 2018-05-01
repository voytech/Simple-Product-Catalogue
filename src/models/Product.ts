import {Schema, Model, Document, model, connection} from 'mongoose';
import * as streamBuffers from 'stream-buffers';
import {binaryCollections, GridFSModel } from '../BinaryCollections'
import {ResourceDescriptorSchema, IResourceDescriptor} from './ResourceDescriptor'
import { Dated, DatedSchema } from './Dated'
import { v1 as uuid } from 'uuid';
import { Resource } from './Resource'
import { CategoryDoc } from './Category'

let ObjectId =  Schema.Types.ObjectId;

export interface IProperty extends Document{
  name : string;
  value : string;
}

export enum Status {
  Draft = 'draft',
  Published = 'published',
  Live = 'live',
  Archived = 'archived'
}

export interface IProduct extends Document, Dated {
    name: string;
    code: string;
    price : number;
    category : CategoryDoc;
    description: string;
    type: string;
    status: Status;
    tags: string[];
    properties : IProperty[];
    images : IResourceDescriptor[];
    attachments : IResourceDescriptor[];
    addProperty(property : IProperty): Promise<IProduct>
    addTag(tag : string): Promise<IProduct>
    addImage(imageName: string, imageContent:string): Promise<IProduct>
    addAttachment(attachmentName : string, attachmentContent:string): Promise<IProduct>
    removeImage(name : String): Promise<IProduct>;
    removeProperty(name : String): Promise<IProduct>;
    removeAttachment(name : String): Promise<IProduct>;
}

export interface IProductModel {
    loadImage(product: IProduct,name: string): Promise<Resource>
    loadImages(product: IProduct): Promise<Resource[]>
    loadAttachment(product: IProduct,name: string): Promise<Resource>
    loadAttachments(product: IProduct): Promise<Resource[]>
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

const productSchema = new Schema({... DatedSchema,
    name: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
    },
    price: {
      type: Schema.Types.Number 
    },
    status: {
      type: String,
      enum:[Status.Draft, Status.Live, Status.Published, Status.Archived],
      default : Status.Draft,
      required: true
    },
    description : {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    category : {
      type: Schema.Types.ObjectId,
      ref: 'Category',
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
  if (!this.code) this.code = uuid();
  if (!this.status) this.status = Status.Draft;
  next()
});

productSchema.static('loadImage',function(product: IProduct, filename: string){
    let meta = product.images.filter((e) => e.name = filename);
    return binaryCollections.loadResource('Image', meta);
});

productSchema.static('loadImages',function(product: IProduct){
    return binaryCollections.loadResources('Image', product.images);
});

productSchema.static('loadAttachment',function(product: IProduct, filename: string){
    let meta = product.attachments.filter((e) => e.name = filename);
    return binaryCollections.loadResource('Attachment', meta);
});

productSchema.static('loadAttachments',function(product: IProduct){
    return binaryCollections.loadResources('Attachment', product.attachments);
});

productSchema.method('addProperty',function(property : IProperty){
  this.properties.push(property);
  return this.save();
});

productSchema.method('addTag',function(tag : string){
  this.tags.push(tag);
  return this.save();
});

productSchema.method('addImage',function(imageName: string, content : string){
    return binaryCollections.addContent('Image', this, imageName, content)
                            .then(image => {
                                this.images.push({name:imageName, refId:image.data._id});
                                return this.save()
                             })
});

productSchema.method('addAttachment',function(attachmentName: string, content : string, callback : (err: any, product: IProduct) => void){
    return binaryCollections.addContent('Attachment', this, attachmentName, content)
                            .then(attachment => {
                                this.attachments.push({name:attachmentName, refId:attachment.data._id});
                                return this.save()
                            })
});

productSchema.method('removeImage',function(name: string){
  let image = this.images.filter(image => image.name === name)[0];
  image.remove();
  return this.save();
});

productSchema.method('removeAttachment',function(name: string){
  let obj = this.attachments.filter(obj => obj.name === name)[0];
  obj.remove();
  return this.save();
});

productSchema.method('removeProperty',function(name: string){
  let obj = this.properties.filter(obj => obj.name === name)[0];
  obj.remove();
  return this.save();
});

productSchema.method('removeTag',function(name: string){
  let obj = this.tags.filter(obj => obj.name === name)[0];
  obj.remove();
  return this.save();
});

export type ProductModel = Model<IProduct> & IProductModel & IProduct;
export type PropertyModel = Model<IProperty> & IProperty;

export const Property: PropertyModel = <PropertyModel>model<IProperty>("Property", propertySchema);
export const Product: ProductModel = <ProductModel>model<IProduct>("Product", productSchema);
