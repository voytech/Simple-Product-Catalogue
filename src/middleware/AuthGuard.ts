import { Router, Request, Response, NextFunction } from 'express';

export interface InjectRolesFunction {
    (roles : string[]): void;
}

export interface AuthenticateRequestFunction {
    (req : Request, res : Response, injectRole : InjectRolesFunction): void;
}

export class AuthGuard {

  private roleExtractor : Function;

  private authenticateRequest : AuthenticateRequestFunction;

  constructor(authenticateRequest: AuthenticateRequestFunction){
      this.authenticateRequest = authenticateRequest;
  }

  public guard(roles : string[]) {
    return (req : Request, res : Response, next : NextFunction) => {
      let injectRoles : InjectRolesFunction = (userRoles: string[]) => {
        if (userRoles){
          let permitted = userRoles.every(role => roles.indexOf(role) !== -1);
          if (permitted){
            return next();
          } else {
            return res.status(403).json({status:'error', code: 'forbidden', required_permissions: roles});
          }
        } else {
          return next();
        }
      }
      this.authenticateRequest(req, res, injectRoles);
    }
  }
}
