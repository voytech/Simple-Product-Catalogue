import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FileButton  } from '../../components/FileButton';
import { Col, Row, Panel,
         Button, FormGroup, ControlLabel, FormControl,
         Glyphicon, Label,
         ButtonToolbar,
         Image, Thumbnail } from 'react-bootstrap';
import { Product, ImageData, ProductProperty, productValidation } from '../../actions/products/Model'
import { uploadImageAction } from '../../actions/products/UploadImageAction'
import { removeImageAction } from '../../actions/products/RemoveImageAction'
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

  reloadImages(product){
    if (product){
      http.get('products/'+product.name+'/images').then((images)=>{
        this.setState({images: images.data});
      });
    }
  }

  componentDidMount(){
    if (this.props.product){
      this.reloadImages(this.props.product);
    }
  }

  componentWillReceiveProps(props){
    if (props.product){
      this.reloadImages(props.product);
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

  thumbnail(image : ImageData){
    return <div key={image.name} className='pull-left thumbnail-view'>
              <Image height={100} width={100} src={image.data}/>
              <Button className='thumbnail-remove' bsSize='xsmall' bsStyle="danger" onClick={(e) => removeImageAction(this.props.product.name,image.name)}>
                <Glyphicon glyph='trash'/>
              </Button>
           </div>
  }
  render(){
    return  <Panel>
              <Panel.Heading>
                <FileButton title='Upload a File' buttonClass='btn-primary' onChange={this.handleFileUpload}/>
              </Panel.Heading>
              <Panel.Body>
                {this.state.images && this.state.images.map(img => this.thumbnail(img))}
              </Panel.Body>
            </Panel>

  }
}
