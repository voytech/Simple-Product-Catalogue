import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
         Button,
         Glyphicon,
         ButtonToolbar  } from 'react-bootstrap';
import { PriceList, PriceListItem } from './Model'

interface PriceListDetailsProps{
  savePriceList : (product : PriceList) => void;
  priceList ?: PriceList;
  editMode ?: boolean;
}

export class PriceListDetails extends React.Component<PriceListDetailsProps>{
  constructor(props){
    super(props);
  }


  private default() : PriceList{
    return {
      name: '',
      description:'...',
      category: '...'
    }
  }

  render(){
    return <Formik
              enableReinitialize={ this.props.editMode }
              initialValues={ this.default() }
              //validationSchema={ productValidation }
              onSubmit={(values: PriceList) => this.props.savePriceList(values)}
              render={(props : FormikProps<PriceList>) => (
                 <Form className="form-horizontal">
                  <div className='mt-2'>
                    <Col sm={6} className='vertical-divider'>
                      <HFormGroup name='name' display='Price List Name'
                                  value={props.values.name}
                                  type='text'
                                  errors={props.touched.name && props.errors.name}
                                  onChange={props.handleChange} />
                      <HFormGroup name='description' display='Description'
                                  value={props.values.description}
                                  type='text'
                                  componentClass='textarea'
                                  onChange={props.handleChange} />
                    </Col>
                    <Col sm={6}>
                      <Row>
                        <Col sm={6}>
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='type' display='Type'
                                      value={props.values.category}
                                      type='text'
                                      errors={props.touched.category && props.errors.category}
                                      onChange={props.handleChange}/>
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='category' display='Category'
                                      value={props.values.category}
                                      type='text'
                                      errors={props.touched.category && props.errors.category}
                                      onChange={props.handleChange} />
                        </Col>
                      </Row>
                    </Col>
                  </div>
                  <Button bsStyle="primary" type="submit" >Save</Button>
                </Form>
              )}/>
  }
}
