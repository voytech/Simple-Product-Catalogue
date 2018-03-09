import { BaseTest } from '../BaseTest';
import { PriceList } from '../../models/PriceList';
import { expect } from 'chai';
import { samplePriceList } from './SampleData';
import { connection } from 'mongoose'

describe('PriceList management', () => {
    const test = new BaseTest();
    before((done) => {
      done();
    });

    after((done) => {
      connection.db.dropDatabase().then(()=> done());
    });

    it('it should add new PriceList definition', (done) => {
      console.info('About to create new PriceList ...');
      samplePriceList.save((err, result) => {
        console.info('PriceList has been created ... ' + result.id);
        expect(result).to.be.not.null;
        expect(result).property('id').to.be.not.null;
        done();
      });
    }).timeout(5000);

    it('it should find PriceList by name',(done)=>{
      console.info('About query PriceList by name...');
      PriceList.findByName('Castorama P1',(err,result)=>{
        console.info('found a PriceList');
        expect(result).to.be.not.null;
        done();
      })
    }).timeout(5000);
});
