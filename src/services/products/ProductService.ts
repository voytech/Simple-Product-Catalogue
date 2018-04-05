import { Product,IProduct, Property, IProperty } from '../../models/Product'
import { Resource, IResource } from '../../models/Resource'
import {Schema, Model, Document, model, connection} from 'mongoose';

import { BaseCRUDService } from '../BaseCRUDService'

export class ProductService extends BaseCRUDService<IProduct>{

  constructor(model: Model<IProduct>, identityField : string){
    super(model,identityField)
  }

  static create(model: Model<any>, identityField : string){
    return new BaseCRUDService(model,identityField);
  }

  public addProperty(productName:string, property:IProperty){
    return Product.findOne({name:productName})
                  .then(product => { return product.addProperty(property)} )
  }

  public removeProperty(productName:string,propertyName:string){
    return this.getByIdentityField(productName)
               .then(product => { return product.removeProperty(propertyName)})
  }

  public saveAndGetAllProducts(product:IProduct){
    return Product.findOneAndUpdate({name : product.name}, { $set:  product }, { new: true })
                  .then(product => { return this.getAll()} )
  }

  public removeAndGetAllProducts(productName : string){
    return Product.remove({name : productName})
                  .then(removed => { return this.getAll()})
  }

  public uploadAttachment(productName:string, resource : IResource ){
    return this.getByIdentityField(productName)
               .then(product => { return product.addAttachment(resource.name,resource.data)} )
  }

  public loadAttachments(productName:string){
    return this.getByIdentityField(productName)
               .then(product => { return Product.loadAttachments(product)})
  }

  public loadAttachment(productName:string, resource : IResource ){
    return null
  }

  public removeAttachment(productName:string, attachmentName : string ){
    return this.getByIdentityField(productName)
               .then(product => { return product.removeAttachment(attachmentName)})
  }

  public uploadImage(productName:string, resource : IResource ){
    return this.getByIdentityField(productName)
               .then(product => { return product.addImage(resource.name,resource.data)} )
  }

  public loadImages(productName:string){
    return this.getByIdentityField(productName)
               .then(product => { return Product.loadImages(product)})
  }

  public loadImage(productName:string, resource : IResource ){
    return null
  }

  public removeImage(productName:string, imageName : string ){
    return this.getByIdentityField(productName)
               .then(product => { return product.removeImage(imageName)})
  }

}
