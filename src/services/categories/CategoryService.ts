import { CategoryDoc, CategoryTreeDoc, CategoryTreeImpl, Category } from '../../models/Category'
import { Schema, Model, Document, model, connection } from 'mongoose';

import { BaseCRUDService } from '../BaseCRUDService'

export class CategoryService extends BaseCRUDService<CategoryDoc>{

  constructor(model: Model<CategoryDoc>, identityField : string){
    super(model,identityField)
  }

  public getCategoryChildTree(node : CategoryDoc, tree ?: CategoryTreeDoc){
    if (!tree) tree = new CategoryTreeImpl(node)
    return Category.find({parent : node._id}).exec()
                   .then(categories => Promise.all(categories.map(c => this.getCategoryChildTree(c,new CategoryTreeImpl(c)))))
                   .then(subtrees => {return tree.childs = subtrees})
  }

  public getCategoryTrees(){
    return Category.find({parent: null}).exec()
                   .then(roots => {return Promise.all(roots.map(root => this.getCategoryChildTree(root)))})
  }

}
