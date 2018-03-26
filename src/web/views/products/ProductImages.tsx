import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FileButton  } from '../../components/FileButton';
import { Col, Row, Panel,
         Button, FormGroup, ControlLabel, FormControl,
         Glyphicon, Label,
         ButtonToolbar,
         Image } from 'react-bootstrap';
import { Product, ImageData, ProductProperty, productValidation } from './Model'
import { uploadImageAction } from '../../actions/products/UploadImageAction'
import { http } from '../../Config'

interface ProductImagesProps{
   product ?: Product;
}

interface ProductImagesState{
  images ?: ImageData[];
}

interface UploadImage {
  product : Product;
  image : any;
}

class UploadImage {
  constructor(public product: Product, public image : any){}
}

export class ProductImages extends React.Component<ProductImagesProps,ProductImagesState>{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if (this.props.product){
      http.get('products/'+this.props.product.name+'/images').then((images)=>{
        this.setState({images: images.data});
      });
    }
  }

  handleFileUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener("load", (event) => {
        uploadImageAction(new UploadImage(this.props.product, {
          filename: file.name,
          data : (event.target as any).result
        }));
    }, false);
    reader.readAsDataURL(file);
  }

  render(){
    return  <Panel>
              <Panel.Heading>
                <FileButton title='Upload a File' buttonClass='btn-primary' onChange={this.handleFileUpload}/>
              </Panel.Heading>
              <Panel.Body>
                {this.state.images && this.state.images.map(img => <Image key={img.name} height={100} width={100} alt={img.name} src={img.data} thumbnail/>)}
              </Panel.Body>
            </Panel>

  }
}
