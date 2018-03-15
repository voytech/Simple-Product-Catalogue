import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import {default as routers} from './routers';
import { PassportConfig } from './config/passport';

class App {

    public express: express.Application;
    private swaggerSpec : any;

    constructor() {
        this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
        this.swagger();
        this.routes();
    }

    /**
     * database connection
     */
    private database(): void {
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
        //mongoose.connection.on('connected',callback);
    }

    private swagger(): void {
      let swaggerDefinition = {
        info: {
          title: 'Simple Product Catalogue',
          version: '1.0.0',
          description: 'Simple Product Catalogue API',
        },
        basePath: '/v1',
      };
      let options = {
        swaggerDefinition: swaggerDefinition,
        apis: [ __dirname+'/routers/user/Auth.js',
                __dirname+'/routers/products/Products.js' ],
      };
      this.swaggerSpec = swaggerJSDoc(options);
    }
    /**
     * http(s) request middleware
     */
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // dev only
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if(req.method === 'OPTIONS'){
                res.status(200).send();
            } else {
                next();
            }
        });
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        const pConfig = new PassportConfig(passport);
        pConfig.init();
    }

    /**
     * app environment configuration
     */
    private setEnvironment(): void {
        dotenv.config({ path: '.env' });
    }

    /**
     * API main v1 routes
     */
    private routes(): void {
        this.express.use('/v1', routers);
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
        this.express.use('/',express.static(__dirname+"/web"));        
    }

}

export default new App().express;
//export default app;
