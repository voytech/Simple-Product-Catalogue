import {Schema, Model, Document, model, connection} from 'mongoose';
import { BaseRoute } from './BaseRoute';
import { BaseCRUDService } from '../services/BaseCRUDService'
import { Router, Request, Response } from 'express';
import { ComposableFunction } from '../Utils'


export class CRUDRoute<T extends Document,E extends BaseCRUDService<T>> extends BaseRoute {

  protected service : E;

  constructor(private model: Model<T>,
              private identityField : string,
              private transforms : ComposableFunction<T>[]){
    super();
    this.service = <E>this.createService(model,identityField);
  }

  protected createService(model : Model<T>,identityField : string) : BaseCRUDService<T>{
    return new BaseCRUDService<T>(model,identityField);
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

  public getPageAction(router : Router) : void {
    router.get('/page',this.restrict(['ADMIN']),(req:Request,res:Response)=>{
      let {offset, size } =req.query
      this.service.getPage({offset:offset,size:size})
                  .then(result => res.json(result.map(e => e.toJSON())))
                  .catch(err => res.status(500).json(err))
    });
  }

  public getPageWithTotalAction(router : Router) : void {
    router.get('/pageWithTotal',this.restrict(['ADMIN']),(req:Request,res:Response)=>{
      let {offset, size } =req.query
      this.service.getPageWithTotal({offset:offset,size:size})
                  .then(result => res.json(result))
                  .catch(err => res.status(500).json(err))
    });
  }

}
