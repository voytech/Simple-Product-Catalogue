import * as GridFS  from 'mongoose-gridfs';
import {Schema, Model, Document, model, connection} from 'mongoose';

export interface IGridFS extends Document{

}

export interface IGridFSModel{
  write(meta : any,readable: ReadableStream,callback : (error,createdFile)=>void): void
}

export type GridFSModel = Model<IGridFS> & IGridFSModel;

class BinaryCollections{

  private binaryCollections : {};

  public getBinaryCollection(modelName:string, collection:string) : GridFSModel{
    let gridFS =  this.binaryCollections[collection];
    if (gridFS == null){
      this.binaryCollections[collection] = GridFS({
        collection:collection,
        model:modelName,
        mongooseConnection: connection
      });
    }
    return <GridFSModel>model<IGridFS>(modelName,this.binaryCollections[collection].schema);
  }
}

export const binaryCollections = new BinaryCollections();
