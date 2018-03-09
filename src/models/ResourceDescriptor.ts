import {Schema, Model, Document, model, connection} from 'mongoose';
let ObjectId =  Schema.Types.ObjectId;

export interface IResourceDescriptor extends Document{
  name : string;
  refId : string;
}

export const ResourceDescriptorSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    refId: {
      type: ObjectId,
      required: true
    }
});
