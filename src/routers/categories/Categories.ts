import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { BaseRoute } from '../BaseRoute';
import { CategoryDoc, Category, CategoryTreeDoc, CategoryTreeImpl } from '../../models/Category';
import { CategoryService } from '../../services/categories/CategoryService';
import { Resource } from '../../models/Resource';
import { CRUDRoute } from '../CRUDRoute'
import {Model} from 'mongoose';

export class Categories extends CRUDRoute<CategoryDoc,CategoryService> {

    constructor(){
      super(Category,'name',[]);
    }

    createService(model : Model<CategoryDoc>,identityField : string) : CategoryService{
      return new CategoryService(model,identityField);
    }


}
