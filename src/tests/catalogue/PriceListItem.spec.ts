import { BaseTest } from '../BaseTest';
import { PriceList } from '../../models/PriceList';
import { PriceListItem } from '../../models/PriceListItem';
import { Product } from '../../models/Product';
import { expect } from 'chai';
import { Document } from 'mongoose';
import { sampleProduct, samplePriceList, createSamplePriceListItem, createSampleProduct, createSamplePriceList } from './SampleData'
import { connection } from 'mongoose'

describe('PriceListItem management', function(){
    const test = new BaseTest();
    let priceList : Document  = createSamplePriceList({});
    let product : Document = createSampleProduct({});

    before(function(done){
      this.timeout(5000);
      priceList.save().then(()=>
        product.save().then(()=> done()));
    });

    after((done) => {
      connection.db.dropDatabase().then(()=> done());
    });

    it('it should add new PriceListItem definition', (done) => {
      console.info('About to create new PriceListItem ...');
      let priceListItem = createSamplePriceListItem(product,priceList,{});
      console.log('Saving PriceListItem >>>');
      console.log(priceListItem);
      console.log('<<<======================');
      priceListItem.save((err,result)=>{
          console.info('Created PriceListItem [ '+result.id+' ]  >>>');
          console.log(result);
          console.log('<<<==========================================');
          expect(result).to.be.not.null;
          expect(result).property('id').to.be.not.null;
          done();
      });

    }).timeout(5000);

    it('it should find PriceListItem by name',(done)=>{
      console.info('About query PriceList by name...');
      PriceListItem.findByName('Kitchen Wall Plate 40x25 HOUSESMART',(err,result)=>{
        console.info('Found PriceListItem [ '+result.id+' ]  >>>');
        console.log(result);
        console.log('<<<==========================================');
        expect(result).to.be.not.null;
        expect(result).property('id').to.be.not.null;
        done();
      })
    });

    it('it should find PriceListItem by name and populate product',(done)=>{
      console.info('About query PriceList by name...');
      PriceListItem.pFindByName('Kitchen Wall Plate 40x25 HOUSESMART',['product'],(err,result)=>{
        console.info('Found PriceListItem [ '+result.id+' ]  >>>');
        console.log(result);
        console.log('<<<==========================================');
        expect(result).to.be.not.null;
        expect(result).property('id').to.be.not.null;
        done();
      })
    });
});
