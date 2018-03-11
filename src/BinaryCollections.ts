import * as GridFS  from 'mongoose-gridfs';
import * as streamBuffers from 'stream-buffers';
import {Schema, Model, Document, model, connection} from 'mongoose';
import * as pluralize from 'pluralize';

export interface IGridFS extends Document{
}

export interface IGridFSModel{
  write(meta : any,readable: ReadableStream,callback : (error,createdFile)=>void): void
  readByFileName(name:string,callback: (error,readFile)=>void): void
  readById(id:string,callback: (error,readFile)=>void): void
}

export type GridFSModel = Model<IGridFS> & IGridFSModel;

class BinaryCollections{

  private binaryCollections : any = {};
  private fileName = (doc : Document,resourceModel:string, fileName:string) => doc.collection.name+ '/' +
                                                                               doc.id+ '/'+
                                                                               pluralize(resourceModel.toLowerCase()) + '/' +
                                                                               fileName;

  public getBinaryCollection(modelName:string) : GridFSModel{
    let collection =  pluralize(modelName.toLowerCase());
    let gridFS =  this.binaryCollections[collection];
    if (gridFS == null){
      this.binaryCollections[collection] = GridFS({
        collection:collection,
        model:modelName,
        mongooseConnection: connection
      });
    }
    return this.binaryCollections[collection].model; //<GridFSModel>model<IGridFS>(modelName,this.binaryCollections[collection].schema);
  }

  public addBinary(binaryName:string, binaryContent:string,  model:string, cb:(error,createdFile)=> void){
    let readableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048
    });
    readableStreamBuffer.put(binaryContent);
    readableStreamBuffer.stop();
    let Binary = this.getBinaryCollection(model);
    Binary.write({
        filename: binaryName,
        contentType:'text/plain'
      },
      readableStreamBuffer,
      cb
    );
  }

  public addContent(resourceModel:string,doc: Document, binaryName:string, binaryContent:string, cb:(error,createdFile)=> void){
    this.addBinary(this.fileName(doc,resourceModel,binaryName),binaryContent,resourceModel,cb);
  }

  public loadResource(resourceModel:string,resourceMeta:any,cb: (error, fileContent)=>void){
    let Binary = this.getBinaryCollection(resourceModel);
    Binary.readById(resourceMeta.refId,cb);
  }
}

export const binaryCollections = new BinaryCollections();
