import {Schema, Model, Document, model, connection} from 'mongoose';
import { BaseRoute } from './BaseRoute';
import { Router, Request, Response } from 'express';


export class CRUDRoute<T extends Document> extends BaseRoute {

  constructor(private model: Model<T>, private identityField : string){
    super();
  }

  public addAction(router: Router): void {
      router.post('/create',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.model.create({ ... req.body },(err,result)=>{
            if (err){
              return res.status(500).json(err);
            } else {
              return res.json(result.toJSON());
            }
          })
      });
  }

  public saveAction(router: Router): void {
      router.post('/save',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          let fieldValue = req.body[this.identityField];
          //req.body.delete(this.identityField);
          this.model.findOneAndUpdate({[this.identityField] : fieldValue}, { $set: { ...req.body }}, { new: true }, function (err, result) {
            if (err) return res.status(500).json(err);
            res.json(result);
          });
      });
  }

  public removeAction(router: Router): void {
      router.delete('/remove/:resourceName',(req:Request,res:Response)=>{
        this.model.remove({name : req.params.resourceName}).then((err)=>{
          return res.json({status: 'removed'});
        })
      });
  }

  public getAllAction(router: Router): void {
      router.get('/all',(req:Request,res:Response)=>{
        this.model.find((err, result) => {
          if (err) return res.status(500).json(err);
          res.json(result.map((e) => e.toJSON()));
        })
      });
  }

  public getAllKeysAction(router : Router) : void {
    router.get('/allkeys',(req:Request,res:Response)=>{
      this.model.find().select(this.identityField).exec((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result.map((e) => e.toJSON()));
      })
    });
  }

}
