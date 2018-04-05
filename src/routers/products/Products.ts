import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'
import { withErasure } from '../../services/ServiceUtils'
import { ProductService } from '../../services/products/ProductService'
import {Model} from 'mongoose';

export class Products extends CRUDRoute<IProduct,ProductService> {

    constructor(){
      super(Product,
            //target mongoose model to be used by CRUDRoute.
            'name',
            //identity field for identity based generic operations.
            [(p:IProduct) => withErasure(p,'status') as IProduct]);
            //chain of trasformers to be applied on payload in mutating routes. (Create/Update)
            //this will ensure we never propagate down fields managed by dedicated logic.
    }

    protected createService(model : Model<IProduct>,identityField : string){
      return new ProductService(model,identityField);
    }

    public addPropertyAction(router: Router): void {
        router.post('/:productName/addProperty',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            this.service.addProperty(req.params.productName,req.body)
                        .then(product => res.json(product))
                        .catch(err => res.status(500).json(err))
        });
    }

    public saveAndGetAllProductsAction(router : Router): void{
        router.post('/save/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            this.service.saveAndGetAllProducts(req.body)
                        .then(result => res.json(result.map(e => e.toJSON())))
                        .catch(err => res.status(500).json(err))
        });
    }

    public uploadAttachmentAction(router: Router): void {
        router.post('/:productName/uploadAttachment',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            this.service.uploadAttachment(req.params.productName,req.body)
                        .then(product => res.json(product))
                        .catch(err => res.status(500).json(err))
        });
    }

    public uploadImageAction(router : Router): void{
        router.post('/:productName/uploadImage',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            this.service.uploadImage(req.params.productName,req.body)
                        .then(product => res.json(product))
                        .catch(err => res.status(500).json(err))
        });
    }

    public loadImageAction(router : Router): void {
      router.post('/image',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          let { product, name } = req.body;
          this.service.getByIdentityField(product.name)
                      .then(product => { return Product.loadImage(product,name)} )
                      .then(image => res.json(image))
                      .catch(err => res.status(500).json(err));
      });
    }

    public loadImagesAction(router : Router): void {
      router.get('/:productName/images',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.loadImages(req.params.productName)
                      .then(images => res.json(images.map(img => {return new Resource(img.name,img.data.toString('utf8'))})))
                      .catch(err => res.status(500).json(err));
      });
    }

    public loadAttachmentsAction(router : Router): void {
      router.get('/:productName/attachments',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.loadAttachments(req.params.productName)
                      .then(atts => res.json(atts.map(att => {return new Resource(att.name,att.data.toString('utf8'))})))
                      .catch(err => res.status(500).json(err))
      });
    }

    public removeImageAction(router : Router): void {
      router.delete('/:productName/images/:imageName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.removeImage(req.params.productName,req.params.imageName)
                      .then(product => res.json(product))
                      .catch(err => res.status(500).json(err))
      });
    }

    public removePropertyAction(router : Router): void {
      router.delete('/:productName/properties/:propName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.removeProperty(req.params.productName,req.params.propName)
                      .then(product => res.json(product))
                      .catch(err => res.status(500).json(err))
      });
    }

    public removeAttachmentAction(router : Router): void {
      router.delete('/:productName/attachments/:attachmentName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.removeAttachment(req.params.productName,req.params.attachmentName)
                      .then(product => res.json(product))
                      .catch(err => res.status(500).json(err))
      });
    }

    public removeAndGetAllProductsAction(router : Router): void{
        router.post('/remove/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            this.service.removeAndGetAllProducts(req.body.name)
                        .then(all => res.json(all.map((e) => e.toJSON())))
                        .catch(err => res.status(500).json(err))
        });
    }

}
