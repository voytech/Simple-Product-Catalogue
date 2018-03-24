import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
         Button,
         Glyphicon,
         ButtonToolbar  } from 'react-bootstrap';
import { emailValidation, emptyValidation } from '../../components/FormValidators'

export interface ProductProperty {
  name : string;
  value : string;
}

export interface Product {
  name: string;
  type: string;
  code ?: string;
  category : string;
  description: string;
  startDate : string;
  effectiveStartDate : string;
  endDate : string;
  effectiveEndDate : string;
  tags ?: string[];
  properties ?: ProductProperty[];
  images ?: string[];
  attachments ?: string[];
}

interface ProductEditorProps{
  saveProduct : (product : Product) => void;
  product ?: Product;
  editMode ?: boolean;
}

interface ProductEditorState{
  product ?: Product;
}

export class ProductEditor extends React.Component<ProductEditorProps,ProductEditorState>{
  constructor(props){
    super(props);
  }

  private default() : Product{
    return {
      name: '',
      type: 'tangible',
      category : '',
      description:'...',
      startDate : new Date().toISOString().split('T')[0],
      effectiveStartDate :new Date().toISOString().split('T')[0],
      endDate : '9999-12-31',
      effectiveEndDate : '9999-12-31'
    }
  }

  render(){
    return <Formik
              enableReinitialize={ this.props.editMode }
              initialValues={ this.props.product }
              validate={values => {}}
              onSubmit={(values: Product) => this.props.saveProduct(values)}
              render={(props : FormikProps<Product>) => (
                 <Form className="form-horizontal">
                  <div className='mt-2'>
                    <Col sm={6} className='vertical-divider'>
                      <HFormGroup name='name' display='Product Name' value={props.values.name} type='text' onChange={props.handleChange} />
                      <HFormGroup name='description' display='Description' value={props.values.description} type='text' componentClass='textarea' onChange={props.handleChange} />
                    </Col>
                    <Col sm={6}>
                      <Row>
                        <Col sm={6}>
                          <HFormGroup labelWidth={4} controlWidth={8} name='type' display='Type' value={props.values.type} type='text' onChange={props.handleChange}/>
                          <HFormGroup labelWidth={4} controlWidth={8} name='startDate' display='Start Date' value={props.values.startDate} type='date' onChange={props.handleChange}  />
                          <HFormGroup labelWidth={4} controlWidth={8} name='endDate' display='End Date' value={props.values.endDate} type='date' onChange={props.handleChange}  />
                        </Col>
                        <Col sm={6}>
                          <HFormGroup labelWidth={4} controlWidth={8} name='category' display='Category' value={props.values.category} type='text' onChange={props.handleChange} />
                          <HFormGroup labelWidth={4} controlWidth={8} name='effectiveStartDate' display='Available Date' value={props.values.effectiveStartDate} type='date' onChange={props.handleChange}  />
                          <HFormGroup labelWidth={4} controlWidth={8} name='effectiveEndDate' display='Expiry Date' value={props.values.effectiveEndDate} type='date' onChange={props.handleChange}  />
                        </Col>
                      </Row>
                    </Col>
                  </div>
                  <Button bsStyle="primary" type="submit" >Save !</Button>
                </Form>
              )}/>
  }
}
