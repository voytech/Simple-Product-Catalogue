import { BaseTest } from '../BaseTest';
import { PriceList } from '../../models/PriceList';
import { PriceListItem } from '../../models/PriceListItem';
import { Product } from '../../models/Product';
import { expect } from 'chai';
import { Document } from 'mongoose';
import { sampleProduct, samplePriceList, createSamplePriceListItem, createSampleProduct, createSamplePriceList } from './SampleData'
import { connection } from 'mongoose'

describe('PriceListItem management', () => {
    const test = new BaseTest();

    let priceList : Document  = createSamplePriceList({});
    let product : Document = createSampleProduct({});

    before((done) => {
      priceList.save().then(()=>
        product.save().then(()=>
          done()));
    });

    after((done) => {
      connection.db.dropDatabase().then(()=> done());
    });

    it('it should add new PriceListItem definition', (done) => {
      console.info('About to create new PriceListItem ...');
      done();
    }).timeout(5000);

    it('it should find PriceListItem by name',(done)=>{
      console.info('About query PriceList by name...');
      done(); 
    });
});
