import { BaseTest } from '../BaseTest';
import { Product , Property } from '../../models/Product';
import { expect } from 'chai';
import { sampleImg } from './SmapleImage';
import { sampleProduct } from './SampleData';
import { connection } from 'mongoose';

describe('Product management', () => {
    const test = new BaseTest();
    before((done) => {
      done();
    });

    after((done) => {
      connection.db.dropDatabase().then(()=> done());
    });

    it('it should add new product definition', (done) => {
      console.info('About to create new product ...');
      sampleProduct.save((err, result) => {
        console.info('Product has been created ... ' + result.id);
        expect(result).to.be.not.null;
        expect(result).property('id').to.be.not.null;
        done();
      });
    }).timeout(5000);

    it('it should add properties ', (done) => {
      console.info('About to add new product properties...');
      sampleProduct.addProperty(new Property({name:'color',value:'white'}),(err,result)=>{
        console.info("New Sub-Document property added into Product")
        expect(result).to.be.not.null;
        expect(result).property('properties').to.be.not.null;
        expect(result).property('properties').to.be.not.empty;
        done();
      });
    });

    it('it should add tags', (done) => {
      console.info('About to add new product properties...');
      sampleProduct.addTag('supper-product',(err,result)=>{
        console.info("New tag string added into Product tags string array")
        expect(result).to.be.not.null;
        expect(result).property('tags').to.be.not.null;
        expect(result).property('tags').to.be.not.empty;
        done();
      });
    });

    it('it should add image', (done) => {
      console.info('About to add new product image...');
      sampleProduct.addImage('image1',sampleImg,(err,result)=>{
        console.info("New image added into Product images string array")
        expect(result).to.be.not.null;
        expect(result).property('tags').to.be.not.null;
        expect(result).property('tags').to.be.not.empty;
        expect(result).property('images').to.be.not.empty;
        done();
      });
    });

    it('it should load image', (done) => {
      console.info('About to load product image ...');
      Product.loadImage(sampleProduct,'image1',(err,result)=>{
        console.info("Image has been loaded ...");
        console.info(result);
        expect(result).to.be.not.null;
        done();
      });
    });

    it('it should find product by name',(done)=>{
      console.info('About query product by name...');
      Product.findByName('Kitchen Wall Plate 40x25 HOUSESMART',(err,result)=>{
        console.info('found a product');
        expect(result).to.be.not.null;
        done();
      })
    });
});
