import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';
import { Passport } from "passport";
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user';

/**
 * passport jwt configuration
 */
export class PassportConfig {

    public passport: any;

    constructor(passport: any){
        this.passport = passport;
    }

    private strategyDefaultBehaviour(identityAccessor) {
      return null;
    }

    public init() {

        this.passport.use(new BearerStrategy((token, done) => {
            let jwtTokenPayload = jwt.verify(token, process.env.APPLICATION_SECRET);
            User.findOne({_id: jwtTokenPayload.id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));

        let localOpts = {
          usernameField: 'email',
          passwordField: 'passwd'
        };
        this.passport.use(new LocalStrategy(localOpts,(email, password, done) => {
            const re = /\S+@\S+\.\S+/;
            if (!re.test(email)) {
                return done("Invalid email",false);
            }
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }
}
