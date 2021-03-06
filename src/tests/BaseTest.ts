import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import * as mongoose from 'mongoose';
import { server } from '../index'


export class BaseTest {

    chai: any;
    should: any;
    route: string;
    server: any;

    constructor() {
        this.server = server.getServerInstance();
        this.route = `/${process.env.API_VERSION}/`;
        this.chai = chai;
        this.chai.use(chaiHttp);
        this.should = chai.should();
    }

    public clearCollection(coll:string){
      mongoose.connection.db.dropCollection(coll);
    }
}
