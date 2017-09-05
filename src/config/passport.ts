import {Strategy, ExtractJwt} from 'passport-jwt';
import {User} from '../models/user';
import {Passport} from "passport";

/**
 * passport jwt configuration
 */
export class PassportConfig {

    public passport: Passport;

    constructor(passport: any){
        this.passport = passport;
    }

    public init() {
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: process.env.APPLICATION_SECRET
        };
        this.passport.use(new Strategy(opts, (jwtPayload, done) => {
            User.findOne({_id: jwtPayload._doc._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }
}
