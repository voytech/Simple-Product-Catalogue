import { Router, Request, Response } from 'express';
import * as winston from 'winston';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';


export abstract class BaseRoute {

    private readonly _registeredMethodEnding = 'Action';
    router: Router;
    logger: any;


    constructor() {
        this.logger = winston;
        this.onInit();
        this.router = Router();
        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router
    }

    getRouterMethodNames(obj): Set<string> {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => {
                if(k.toString().indexOf(this._registeredMethodEnding,
                        (k.toString().length - this._registeredMethodEnding.length)) !== -1) {
                    methods.add(k);
                }
            });
        }
        return methods;
    }

    protected onInit(): void {}

    protected guard() {
      return (req :Request, res :Response, next) => {
        passport.authenticate("bearer",(err, user, info) => {
          if (err) return next(err);
          if (!user) {
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
          } else {
            req.user = user;
            return next();
          }
        })(req, res, next);
      };
    }

    private initRoutes(): void {
        const methods = this.getRouterMethodNames(this);
        [...methods].map((method) => {
            this[method](this.router);
        });
    }
}
