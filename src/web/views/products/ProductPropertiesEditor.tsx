import * as  React from 'react';
import ReactList from 'react-list';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FileButton  } from '../../components/FileButton';
import { Col, Row, Panel, Button, FormGroup, ControlLabel, FormControl,
         Glyphicon, Label, ButtonToolbar, Image, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Product, ImageData, ProductProperty, productValidation } from './Model'
import { uploadImageAction } from '../../actions/products/UploadImageAction'
import { http } from '../../Config'

interface ProductPropertiesEditorProps{
   product ?: Product;
}

interface ProductPropertiesEditorState{
   properties ?: ProductProperty[]
}

export class ProductPropertiesEditor extends React.Component<ProductPropertiesEditorProps,ProductPropertiesEditorState>{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if (this.props.product){

    }
  }

  addProperty(property : ProductProperty){
    http.post('products/'+this.props.product.name+'/addProperty',JSON.stringify(property))
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
  }

  renderAddProp(){
    return <Formik
              initialValues={ { } }
              onSubmit={(values: ProductProperty) => this.addProperty(values)}
              render={(props : FormikProps<ProductProperty>) => (
                 <Form className="form-inline">
                      <VFormGroup name='name' display='Property'
                                  value={props.values.name}
                                  type='text'
                                  errors={props.touched.name && props.errors.name}
                                  onChange={props.handleChange} />{'  '}
                      <VFormGroup name='value' display='Value'
                                  value={props.values.value}
                                  type='text'
                                  onChange={props.handleChange} />{'  '}
                  <Button bsStyle="primary" type="submit" >Add</Button>
                </Form>
              )}/>
  }

  renderListItem(item,index) {
    return <ListGroupItem key={index}>
              <b>{item.name}</b> : {item.value}
           </ListGroupItem>;
  }
/*
<ReactList
  itemRenderer={this.renderItem}
  length={(this.props.product && this.props.product.properties) ? this.props.product.properties.length : 0}
  type='uniform'
 />
*/
  render(){
    return  <Panel>
              <Panel.Heading>
                {this.renderAddProp()}
              </Panel.Heading>
              <Panel.Body>
                <div style={{overflow: 'auto', maxHeight: 400}}>
                  <ListGroup>
                    {this.props.product && this.props.product.properties && this.props.product.properties.map(this.renderListItem)}
                  </ListGroup>
                </div>
              </Panel.Body>
            </Panel>

  }
}
