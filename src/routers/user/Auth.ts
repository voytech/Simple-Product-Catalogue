import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { User } from '../../models/User';
import { BaseRoute } from '../BaseRoute';
import * as passport from 'passport';

export class Auth extends BaseRoute {

    public loginAction(router: Router): void {
       /**
        * @swagger
        * /user/auth/login:
        *   post:
        *     description: Login to the application
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: email
        *         description: User's email to use for login.
        *         in: formData
        *         required: true
        *         type: string
        *       - name: passwd
        *         description: User's password.
        *         in: formData
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description: login
        */
        router.post('/login',(req,res,next) => {
          passport.authenticate("local",(err, user, info) => {
            if (err) return next(err);
            if (!user) {
              return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
              return res.json({ token: jwt.sign({id: user._id}, process.env.APPLICATION_SECRET)});
            }
          })(req,res,next);
        });
    }


    public registerAction(router: Router): void {
      /**
       * @swagger
       * /user/auth/register:
       *   post:
       *     description: Register new user
       *     produces:
       *       - application/json
       *     parameters:
       *       - name: name
       *         description: User's name.
       *         in: formData
       *         required: true
       *         type: string
       *       - name: email
       *         description: User's email.
       *         in: formData
       *         required: true
       *         type: string
       *       - name: role
       *         description: User's role.
       *         in: formData
       *         required: true
       *         type: string
       *       - name: password
       *         description: User's password.
       *         in: formData
       *         required: true
       *         type: string
       *     responses:
       *       200:
       *         description: Register
       */
        router.post('/register', (req: Request, res: Response) => {
            const re = /\S+@\S+\.\S+/;

            let name = req.body.name,
                email = req.body.email,
                role = req.body.role,
                password = req.body.password;

            if (!name || !re.test(email) || !password || password.length < 6) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'wrong input.'
                });
                return false;
            }

            User.findByEmail(email, (err, user) => {
                if (err) {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json({
                        success: false,
                        message: 'something went wrong.'
                    });
                } else if (!user) {
                    const user = new User({
                        name : name,
                        email: email,
                        password: password,
                        role : role || "USER"
                    });
                    User.createUser(user, (err, user)=>{
                        if (err) {
                            this.logger.error(err.toString());
                            res.status(500);
                            res.json({
                                success: false,
                                message: 'something went wrong.'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'user created.'
                            });
                        }
                    });
                } else {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'this email address has already been taken.'
                    });
                }
            });
        });
    }

    public profileAction(router: Router): void {
      /**
       * @swagger
       * /user/auth/profile:
       *   post:
       *     description: Gets current user profile
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
       *         description: Register
       */
        router.get('/profile',this.restrict(["USER","ADMIN"]), (req: Request, res: Response) => {
            return res.json({
                success: true,
                user: req.user
            });
        });
    }
}
