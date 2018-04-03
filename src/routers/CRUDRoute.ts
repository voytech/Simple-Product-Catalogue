import {Schema, Model, Document, model, connection} from 'mongoose';
import { BaseRoute } from './BaseRoute';
import { BaseCRUDService } from '../services/BaseCRUDService'
import { Router, Request, Response } from 'express';
import { ComposableFunction } from '../Utils'


export class CRUDRoute<T extends Document> extends BaseRoute {

  protected service : BaseCRUDService<T>;

  constructor(private model: Model<T>,
              private identityField : string,
              private transforms : ComposableFunction<T>[]){
    super();
    this.service = new BaseCRUDService(model,identityField);
  }

  public addAction(router: Router): void {
      router.post('/create',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.create(req.body,...this.transforms)
                      .then(result => res.json(result.toJSON()))
                      .catch(err => res.status(500).json(err));
      });
  }

  public saveAction(router: Router): void {
      router.post('/save',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.update(req.body,...this.transforms)
                      .then(result => res.json(result.toJSON()))
                      .catch(err => res.status(500).json(err))
      });
  }

  public removeAction(router: Router): void {
      router.delete('/remove/:resourceName',this.restrict(['ADMIN']),(req:Request,res:Response)=>{
        this.service.remove(req.params.resourceName)
                    .then(result => res.json(result.toJSON()))
                    .catch(err => res.status(500).json(err))
      });
  }

  public getAllAction(router: Router): void {
      router.get('/all',this.restrict(['ADMIN']),(req:Request,res:Response)=>{
        this.service.getAll()
                    .then(result => res.json(result.map(e => e.toJSON())))
                    .catch(err => res.status(500).json(err))
      });
  }

  public getAllKeysAction(router : Router) : void {
    router.get('/allkeys',this.restrict(['ADMIN']),(req:Request,res:Response)=>{
      this.service.getAllKeys()
                  .then(result => res.json(result.map(e => e.toJSON())))
                  .catch(err => res.status(500).json(err))
    });
  }

}
