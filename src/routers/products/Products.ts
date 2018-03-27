import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';
import { Resource } from '../../models/Resource';

export class Products extends BaseRoute {

    public addProductAction(router: Router): void {
      /**
       * @swagger
       * /products/create:
       *   post:
       *     description: Creates new product
       *     produces:
       *       - application/json
       *     parameters:
       *     - name: Authorization
       *       in: header
       *       description: jwt
       *       required: true
       *       type: string
       *       format: string
       *     - name: name
       *       in: body
       *       description: product name
       *       required: true
       *       type: string
       *       format: string
       *     - name: description
       *       in: body
       *       description: product description
       *       required: false
       *       type: string
       *       format: string
       *     - name: category
       *       in: body
       *       description: product category
       *       required: false
       *       type: string
       *       format: string
       *     - name: type
       *       in: body
       *       description: product type
       *       required: true
       *       type: string
       *       format: string
       *     responses:
       *       200:
       *         description: New product added
       */
        router.post('/create',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            new Product({ ... req.body }).save((err,result)=>{
              if (err){
                return res.status(500).json(err);
              } else {
                return res.json(result.toJSON());
              }
            })
        });
    }

    public saveProductAction(router: Router): void {
        router.post('/save',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            Product.findByIdAndUpdate(_id, { $set: { ...rest }}, { new: true }, function (err, product) {
              if (err) return res.status(500).json(err);
              res.json(product);
            });
        });
    }

    public addPropertyAction(router: Router): void {
        router.post('/:productName/addProperty',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            Product.findByName(req.params.productName,(err, product) => {
              if (err) return res.status(500).json(err);
              product.addProperty(req.body,(err,product) => {
                if (err) return res.status(500).json(err);
                return res.json(product);
              });
            });
        });
    }

    public saveAndGetAllProductsAction(router : Router): void{
        router.post('/save/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            Product.findByIdAndUpdate(_id, { $set: { ...rest }}, { new: true }, function (err, product) {
              if (err) return res.status(500).json(err);
              Product.all((err,result)=>{
                if (err) return res.status(500).json(err);
                return res.json(result.map((e) => e.toJSON()));
              })
            });
        });
    }

    public uploadAttachmentAction(router: Router): void {
        router.post('/:productName/uploadAttachment',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { name, data } = req.body;
            Product.findByName(req.params.productName,(err, product) => {
              if (err) return res.status(500).json(err);
              product.addAttachment(name,data,(err,product) => {
                if (err) return res.status(500).json(err);
                return res.json(product);
              });
            });
        });
    }

    public uploadImageAction(router : Router): void{
        router.post('/uploadImage',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { product, image } = req.body;
            Product.findByName(product.name,(err, rproduct) => {
              if (err) return res.status(500).json(err);
              rproduct.addImage(image.filename,image.data,(err,result)=>{
                if (err) return res.status(500).json(err);
                return res.json(result);
              });
            });
        });
    }

    public loadImageAction(router : Router): void {
      router.post('/image',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          let { product, name } = req.body;
          Product.findByName(product.name,(err, rproduct) => {
            if (err) return res.status(500).json(err);
            Product.loadImage(rproduct,name,(err,image)=>{
              if (err) return res.status(500).json(err);
              return res.json(image);
            });
          });
      });
    }

    public loadImagesAction(router : Router): void {
      router.get('/:productName/images',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          Product.findByName(req.params.productName,(err, rproduct) => {
            if (err) return res.status(500).json(err);
            Product.loadImages(rproduct,(err,images)=>{
              if (err) return res.status(500).json(err);
              return res.json(images.map(img => {return new Resource(img.name,img.data.toString('utf8'))}));
            });
          });
      });
    }

    public loadAttachmentsAction(router : Router): void {
      router.get('/:productName/attachments',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          Product.findByName(req.params.productName,(err, product) => {
            if (err) return res.status(500).json(err);
            Product.loadAttachments(product,(err,attachments)=>{
              if (err) return res.status(500).json(err);
              return res.json(attachments.map(att => {return new Resource(att.name,att.data.toString('utf8'))}));
            });
          });
      });
    }

    public removeImageAction(router : Router): void {
      router.delete('/:productName/images/:imageName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          Product.findByName(req.params.productName,(err, product) => {
            if (err) return res.status(500).json(err);
            product.removeImage(req.params.imageName)
                   .then((product) => res.json(product));
          });
      });
    }

    public removePropertyAction(router : Router): void {
      router.delete('/:productName/properties/:propName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          Product.findByName(req.params.productName,(err, product) => {
            if (err) return res.status(500).json(err);
            product.removeProperty(req.params.propName)
                    .then((product) => res.json(product));
          });
      });
    }
    public removeAttachmentAction(router : Router): void {
      router.delete('/:productName/attachments/:attachmentName',this.restrict(['ADMIN']), (req: Request, res: Response) => {
          Product.findByName(req.params.productName,(err, product) => {
            if (err) return res.status(500).json(err);
            product.removeAttachment(req.params.attachmentName)
                   .then((product) => res.json(product))

          });
      });
    }

    public getAllProductsAction(router: Router): void {
        /**
         * @swagger
         * /products/all:
         *   get:
         *     description: Gets all products
         *     produces:
         *       - application/json
         *     parameters:
         *     responses:
         *       200:
         *         description: Got all products
         */
        router.get('/all',(req:Request,res:Response)=>{
          Product.all((err,result)=>{
            return res.json(result.map((e) => e.toJSON()));
          })
        });
    }

    public removeProductAction(router: Router): void {
        router.post('/remove',(req:Request,res:Response)=>{
          Product.remove(req.body).then((err)=>{
            return res.json({status: 'removed'});
          })
        });
    }

    public removeAndGetAllProductsAction(router : Router): void{
        router.post('/remove/getall',this.restrict(['ADMIN']), (req: Request, res: Response) => {
            let { _id, ...rest } = req.body;
            Product.remove(req.body).then((err)=>{
              Product.all((err,result)=>{
                return res.json(result.map((e) => e.toJSON()));
              })
            })
        });
    }

}
