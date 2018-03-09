import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { Product, IProduct } from '../../models/Product';

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
            let product = new Product({
              name:req.body.name,
              description:req.body.description,
              category:req.body.category,
              type:req.body.type
            });
            product.save((err,result)=>{
              return res.json(result.toJSON());
            })
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
         *     - name: Authorization
         *       in: header
         *       description: jwt
         *       required: true
         *       type: string
         *       format: string
         *     responses:
         *       200:
         *         description: Got all products
         */
        router.get('/all',(req:Request,res:Response)=>{
          Product.find((err,result)=>{
            return res.json(result.map((e)=>e.toJSON()));
          })
        });
    }

}