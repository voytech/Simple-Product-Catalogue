import { Router, Request, Response, NextFunction } from 'express';

export class AuthGuard {

  private roleExtractor : Function;

  private authenticateRequest : Function;

  constructor(options){
      this.roleExtractor = options.roleExtractor;
      this.authenticateRequest = options.authenticateRequest;
  }

  public guard(roles : string[]) {
    return (req : Request, res : Response, next : NextFunction) => {
      let wrapNext : NextFunction = (err :any) => {
        let userRoles : string[] = this.roleExtractor(req);
        if (userRoles){          
          let permitted = userRoles.every(role => roles.indexOf(role) !== -1);
          if (permitted){
            return next(err);
          } else {
            return res.status(403).json({status:'error', code: 'forbidden'});
          }
        }else {
          return res.status(401).json({status:'error', code: 'unauthorized'});
        }
      };

      this.authenticateRequest(req, res, wrapNext);
    }
  }
}
