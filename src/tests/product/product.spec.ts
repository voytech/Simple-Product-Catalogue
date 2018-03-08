import { BaseTest } from '../BaseTest';
import { Product , Property } from '../../models/Product';
import { expect } from 'chai';
import { img } from './SmapleImage'

describe('Product management', () => {
    const test = new BaseTest();
    before((done) => {
      done();
    });

    after((done) => {
      done();
    });

    let product = new Product({
      name:'Kitchen Wall Plate 40x25 HOUSESMART',
      code:'001_8829912CD',
      category:'kitchen',
      type:'wall-plate'
    });

    it('it should add new product definition', (done) => {
      console.info('About to create new product ...');
      product.save((err, result) => {
        console.info('Product has been created ... ' + result.id);
        expect(result).to.be.not.null;
        expect(result).property('id').to.be.not.null;
        done();
        console.info('done');
      });
    }).timeout(5000);

    it('it should add properties ', (done) => {
      console.info('About to add new product properties...');
      product.addProperty(new Property({name:'color',value:'white'}),(err,result)=>{
        console.info("New Sub-Document property added into Product")
        expect(result).to.be.not.null;
        expect(result).property('properties').to.be.not.null;
        expect(result).property('properties').to.be.not.empty;
        done();
      });
    });

    it('it should add tags', (done) => {
      console.info('About to add new product properties...');
      product.addTag('supper-product',(err,result)=>{
        console.info("New tag string added into Product tags string array")
        expect(result).to.be.not.null;
        expect(result).property('tags').to.be.not.null;
        expect(result).property('tags').to.be.not.empty;
        done();
      });
    });

    it('it should add image', (done) => {
      console.info('About to add new product image...');
      product.addImage('image1',img,(err,result)=>{
        console.info("New image added into Product images string array")
        expect(result).to.be.not.null;
        expect(result).property('tags').to.be.not.null;
        expect(result).property('tags').to.be.not.empty;
        expect(result).property('images').to.be.not.empty;
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
