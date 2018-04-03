import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'
import { withErasure } from '../../services/ServiceUtils'

export class Products extends CRUDRoute<IProduct> {

    constructor(){
      super(Product,
            //target mongoose model to be used by CRUDRoute.
            'name',
            //identity field for identity based generic operations.
            [(p:IProduct) => withErasure(p,'status') as IProduct]);
            //chain of trasformers to be applied on payload in mutating routes. (Create/Update)
            //this will ensure we never propagate down fields managed by dedicated logic.
    }

    public addPropertyAction(router: Router): void {
        router.post('/:productName/addProperty',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            Product.findOne({name:req.params.productName})
                   .then(product => {
                     product.addProperty(req.body)
                            .then(product => res.json(product))
                            .catch(err => res.status(500).json(err))
                   })
                   .catch(err => res.status(500).json(err));
        });
    }

    public saveAndGetAllProductsAction(router : Router): void{
        router.post('/save/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            Product.findByIdAndUpdate(_id, { $set: { ...rest }}, { new: true })
                   .then(product => this.service.getAll()
                                                .then(result => res.json(result))
                                                .catch(err => res.status(500).json(err)))
                   .catch(err => res.status(500).json(err))
        });
    }

    public uploadAttachmentAction(router: Router): void {
        router.post('/:productName/uploadAttachment',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { name, data } = req.body;
            this.service.getByIdentityField(req.params.productName)
                        .then(product => {
                          product.addAttachment(name,data)
                                 .then(product => res.json(product))
                                 .catch(err => res.status(500).json(err))
                        })
                        .catch(err => res.status(500).json(err));
        });
    }

    public uploadImageAction(router : Router): void{
        router.post('/uploadImage',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { product, image } = req.body;
            this.service.getByIdentityField(product.name)
                        .then(product => {
                          product.addImage(image.filename,image.data)
                                 .then(product => res.json(product))
                                 .catch(err => res.status(500).json(err))
                        })
                        .catch(err => res.status(500).json(err));
        });
    }

    public loadImageAction(router : Router): void {
      router.post('/image',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          let { product, name } = req.body;
          this.service.getByIdentityField(product.name)
                      .then(product => {
                        Product.loadImage(product,name)
                               .then(image => res.json(image))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    public loadImagesAction(router : Router): void {
      router.get('/:productName/images',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.getByIdentityField(req.params.productName)
                      .then(product => {
                        Product.loadImages(product)
                               .then(images => res.json(images.map(img => {return new Resource(img.name,img.data.toString('utf8'))})))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    public loadAttachmentsAction(router : Router): void {
      router.get('/:productName/attachments',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.getByIdentityField(req.params.productName)
                      .then(product => {
                        Product.loadAttachments(product)
                               .then(atts => res.json(atts.map(att => {return new Resource(att.name,att.data.toString('utf8'))})))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    private removeSubdocument(actionName:string,productName:string,componentName:string,req : Request,res : Response){
      this.service.getByIdentityField(productName)
                  .then(product => {
                    product[actionName](componentName)
                           .then(product => res.json(product))
                           .catch(err => res.status(500).json(err))
                  })
                  .catch(err => res.status(500).json(err));
    }

    public removeImageAction(router : Router): void {
      router.delete('/:productName/images/:imageName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.getByIdentityField(req.params.productName)
                      .then(product => {
                        product.removeImage(req.params.imageName)
                               .then(product => res.json(product))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    public removePropertyAction(router : Router): void {
      router.delete('/:productName/properties/:propName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.getByIdentityField(req.params.productName)
                      .then(product => {
                        product.removeProperty(req.params.propName)
                               .then(product => res.json(product))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    public removeAttachmentAction(router : Router): void {
      router.delete('/:productName/attachments/:attachmentName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          this.service.getByIdentityField(req.params.productName)
                      .then(product => {
                        product.removeImage(req.params.attachmentName)
                               .then(product => res.json(product))
                               .catch(err => res.status(500).json(err))
                      })
                      .catch(err => res.status(500).json(err));
      });
    }

    public removeAndGetAllProductsAction(router : Router): void{
        router.post('/remove/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            Product.remove(req.body)
                   .then(removed => {
                      this.service.getAll()
                                  .then(all => res.json(all.map((e) => e.toJSON())))
                                  .catch(err => res.status(500).json(err))
                   })
                   .catch(err => res.status(500).json(err))
        });
    }

}
