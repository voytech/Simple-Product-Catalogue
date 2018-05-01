import { CategoryDoc, Category } from '../../models/Category'
import { Schema, Model, Document, model, connection } from 'mongoose';
import { compose, ComposableFunction } from '../../Utils'

import { BaseCRUDService } from '../BaseCRUDService'

export class CategoryService extends BaseCRUDService<CategoryDoc>{

  constructor(model: Model<CategoryDoc>, identityField : string){
    super(model,identityField)
  }

  public getAll(){
    return Category.find().populate('childs').exec();
  }

  public create(payload : CategoryDoc, ...transforms : ComposableFunction<CategoryDoc>[]){
    let input = this.transformPayload(payload,...transforms)
    if (input.parent){
      return this.getByIdentityField(input.parent.path).then(parent => {
        return Category.create(input).then(result => {
          parent.childs.push(result)
          return parent.save().then(parent => {  return result})
        })
      })
    } else {
      return Category.create(input)
    }
  }

  public getCategoryChildTree(node : CategoryDoc){
    return Category.find({parent: node._id}).exec()
  }

  public getCategoryTrees(){
    return Category.find({parent: null}).exec()
  }

}
