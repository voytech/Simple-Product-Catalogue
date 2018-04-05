import {Schema, Model, Document, model, connection} from 'mongoose';
import { multimethod, compose, ComposableFunction } from '../Utils'

export class PageInfo {
  constructor(public offset : number,public size : number){}
}

export class BaseCRUDService<T extends Document> {

  constructor(private model: Model<T>, private identityField : string){}

  static create(model: Model<any>, identityField : string){
    return new BaseCRUDService(model,identityField);
  }

  private transformPayload(input : T, ...transforms : ComposableFunction<T>[]){
      return transforms ? compose<T>(...transforms)(input) : input;
  }

  public create(payload : T, ...transforms : ComposableFunction<T>[]){
    return this.model.create(this.transformPayload(payload,...transforms))
  }

  public update(payload : T, ...transforms : ComposableFunction<T>[]){
    let fieldValue = payload[this.identityField];
    return this.model.findOneAndUpdate(
      {[this.identityField] : fieldValue},
      { $set: this.transformPayload(payload,...transforms)},
      { new: true }
    );
  }

  public remove(identityFieldValue:string){
    return this.model.remove({[this.identityField] : identityFieldValue});
  }

  public getByIdentityField(identityFieldValue:string){
    return this.model.findOne({[this.identityField] : identityFieldValue}).exec()
  }

  public getAllKeys(){
    return this.model.find().select(this.identityField).exec();
  }

  public getAllKeysWithTotal(){
    return multimethod({
      data : (() => this.getAllKeys()),
      collCount : (() => this.getCount())
    })
  }

  public getAll(){
    return this.model.find().exec();
  }

  public getAllWithTotal(){
    return multimethod({
      data : (() => this.getAll()),
      collCount : (() => this.getCount())
    })
  }

  public getMany(criteria : any){

  }

  public getCount(){
    return this.model.count({}).exec();
  }

  public getPage(pageInfo : PageInfo){
    return this.model.find()
                     .skip(pageInfo.offset)
                     .limit(pageInfo.size).exec();
  }

  public getPageWithTotal(pageInfo : PageInfo){
    return multimethod({
      data : (() => this.getPage(pageInfo)),
      collCount : (() => this.getCount())
    })
  }

}
