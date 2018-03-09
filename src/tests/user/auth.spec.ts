import { BaseTest } from '../BaseTest';
import { connection } from 'mongoose';

describe('/POST user/auth/', () => {

    after((done) => {
      connection.db.dropDatabase().then(()=> done());
    });

    const   test = new BaseTest(),
            random = () => Math.floor(Math.random() * 1000);

    const user = {
        name: 'test user',
        email: `test${random()}@mailinator.com`,
        password: '123456',
    };


    it('it should register a new User', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}user/auth/register`)
            .send(user)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                done();
            });
    });

    it('it should NOT login', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}user/auth/login`)
            .send({email: 'example@gmail.com', passwd: user.password})
            .end((err, res) => {
                res.status.should.equal(401);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('code');
                res.body.code.should.equal('unauthorized');
                done();
            });
    });
    it('it should login sucessfully', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}user/auth/login`)
            .send({email: user.email, passwd: user.password})
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });


    it('it should login, then authorize next request', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}user/auth/login`)
            .send({email: user.email, passwd: user.password})
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                let token = res.body.token;
                test.chai.request(test.server)
                  .get(`${test.route}user/auth/profile`)
                  .set("Authorization","Bearer "+token)
                  .send({full:true})
                  .end((err, res) => {
                     res.status.should.equal(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('success');
                     res.body.should.have.property('user');
                     console.debug(res.body.user);
                     done();
                  });
            });
    });

    it('it should register, login, then NOT authorize next request', (done) => {
        let email = `unknown${random()}@mailinator.com`;
        test.chai.request(test.server)
            .post(`${test.route}user/auth/register`)
            .send({name:'Unknown',password:'123456',email:email,role:'Unknown'})
            .end((err, res) => {
                res.status.should.equal(200);
                test.chai.request(test.server)
                    .post(`${test.route}user/auth/login`)
                    .send({email: email, passwd: '123456'})
                    .end((err, res) => {
                        res.status.should.equal(200);
                        let token = res.body.token;
                        test.chai.request(test.server)
                          .get(`${test.route}user/auth/profile`)
                          .set("Authorization","Bearer "+token)
                          .send({full:true})
                          .end((err, res) => {
                             res.status.should.equal(403);
                             done();
                          });
                    });
            });
    });

    it('it should return error message', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}user/auth/register`)
            .send({})
            .end((err, res) => {
                res.status.should.equal(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                res.body.should.have.property('message');
                done();
            });
    });

});
