import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
         Button, Panel,
         Glyphicon,
         ButtonToolbar,
         ListGroup, ListGroupItem, FormControl  } from 'react-bootstrap';
import { PriceList } from '../../actions/pricelists/Model'

interface PriceListDetailsProps{
  createPriceList : (priceList : PriceList) => void;
}

export class NewPriceList extends React.Component<PriceListDetailsProps>{

  constructor(props){
    super(props);
  }

  private default() : PriceList{
    return {
      name: '',
      description:'Pricelist assigns prices to products',
      category: 'uncategorised',
      type:'any',
      startDate : '9998-12-31',
      endDate : '9998-12-31',
      effectiveStartDate : '9998-12-31',
      effectiveEndDate : '9998-12-31'
    }
  }

  render(){
    return <Formik
              enableReinitialize={ false }
              initialValues={ this.default() }
              //validationSchema={ productValidation }
              onSubmit={(values: PriceList) => this.props.createPriceList(values)}
              render={(props : FormikProps<PriceList>) => (
                 <Form className="form-horizontal">
                  <Row className='mt-2'>
                    <Col sm={6} className='vertical-divider'>
                      <Col sm={6}>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='name' display='Name'
                                    value={props.values.name}
                                    type='text'
                                    errors={props.touched.name && props.errors.name}
                                    onChange={props.handleChange} />
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='description' display='Description'
                                    value={props.values.description}
                                    type='text'
                                    componentClass='textarea'
                                    onChange={props.handleChange} />
                      </Col>
                      <Col sm={6}>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='type' display='Type'
                                    value={props.values.type}
                                    type='text'
                                    errors={props.touched.type && props.errors.type}
                                    onChange={props.handleChange}/>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='category' display='Category'
                                    value={props.values.category}
                                    type='text'
                                    errors={props.touched.category && props.errors.category}
                                    onChange={props.handleChange} />
                      </Col>
                    </Col>
                    <Col sm={6}>
                      <Col sm={6}>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='startDate' display='Start Date'
                                    value={props.values.startDate}
                                    type='date'
                                    errors={props.touched.startDate && props.errors.startDate}
                                    onChange={props.handleChange}/>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='effectiveStartDate' display='Effective Date'
                                    value={props.values.effectiveStartDate}
                                    type='date'
                                    errors={props.touched.effectiveStartDate && props.errors.effectiveStartDate}
                                    onChange={props.handleChange} />
                      </Col>
                      <Col sm={6}>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='endDate' display='End Date'
                                    value={props.values.endDate}
                                    type='date'
                                    errors={props.touched.endDate && props.errors.endDate}
                                    onChange={props.handleChange}/>
                        <HFormGroup labelWidth={4} controlWidth={8}
                                    name='effectiveEndDate' display='Expiry Date'
                                    value={props.values.effectiveEndDate}
                                    type='date'
                                    errors={props.touched.effectiveEndDate && props.errors.effectiveEndDate}
                                    onChange={props.handleChange} />
                      </Col>
                    </Col>
                  </Row>
                  <Button bsStyle="primary" type="submit" >Create</Button>
                </Form>
              )}/>
  }
}
