import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FileButton  } from '../../components/FileButton';
import { Col, Row, Panel, Button, FormGroup, ControlLabel, FormControl,
         Glyphicon, Label, ButtonToolbar, Image, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Product, ImageData, ProductProperty, productValidation } from '../../actions/products/Model'

import { http } from '../../Config'

interface ProductPropertiesProps{
   product ?: Product;
   addProperty : (property: ProductProperty) => void
   removeProperty : (propertyName:string) => void
}

interface ProductPropertiesState{
   properties ?: ProductProperty[]
}

export class ProductProperties extends React.Component<ProductPropertiesProps,ProductPropertiesState>{
  constructor(props){
    super(props);
    this.state = { properties : []};
  }

  componentDidMount(){
    if (this.props.product){

    }
  }

  renderAddProp(){
    return <Formik
              initialValues={ { name : '', value: '' } }
              onSubmit={(values: ProductProperty) => this.props.addProperty(values)}
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

  renderListItem = (item,index) => {
    return <ListGroupItem key={index}>
              <b>{item.name}</b> : {item.value}
              <Button className='pull-right' bsSize='xsmall' bsStyle="danger" onClick={() => this.props.removeProperty(item.name)}>
                <Glyphicon glyph='trash'/>
              </Button>
           </ListGroupItem>;
  }

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
