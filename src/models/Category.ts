import {Schema, Model, Document, model, connection} from 'mongoose';
import { Dated, DatedSchema } from './Dated'
import { v1 as uuid } from 'uuid';

export interface CategoryDoc extends Document{
  name : string;
  description : string;
  parent : string;
}

export interface CategoryTreeDoc {
  category : CategoryDoc,
  childs : CategoryTreeDoc[]
}


export class CategoryTreeImpl implements CategoryTreeDoc {
  childs : CategoryTreeDoc[]
  constructor(public category : CategoryDoc){
    this.childs = []
  }
}

export interface ICategoryModel {
    loadProducts(category: CategoryDoc): Promise<any[]>
    loadTree(category: CategoryDoc) : Promise<CategoryTree>
}

const categorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    parent : {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
});

categorySchema.pre('save', function(next) {
  next()
});

export type CategoryModel = Model<CategoryDoc> & ICategoryModel & CategoryDoc;

export const Category: CategoryModel = <CategoryModel>model<CategoryDoc>("Category", categorySchema);
