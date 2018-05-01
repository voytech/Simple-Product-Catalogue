import {Schema, Model, Document, model, connection} from 'mongoose';
import  * as autopopulate from 'mongoose-autopopulate'
import { Dated, DatedSchema } from './Dated'
import { v1 as uuid } from 'uuid';

export interface CategoryDoc extends Document{
  name : string;
  description : string;
  parent ?: CategoryDoc;
  childs ?: CategoryDoc[];
}

export interface ICategoryModel {
    loadTree(category: CategoryDoc) : Promise<CategoryDoc>
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
    },
    childs : [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      autopopulate : true
    }]

});

categorySchema.plugin(autopopulate);

categorySchema.pre('save', function(next) {
  next()
});

export type CategoryModel = Model<CategoryDoc> & ICategoryModel & CategoryDoc;

export const Category: CategoryModel = <CategoryModel>model<CategoryDoc>("Category", categorySchema);
