import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { StatusComponent  } from '../../components/StatusComponent';
import { Col, Row,
         Button,
         Glyphicon,
         ButtonToolbar, FormControl  } from 'react-bootstrap';
import { Product, Status, ProductProperty, productValidation } from '../../actions/products/Model'
import { loadCategoriesIdentsAction} from '../../actions/categories/LoadCategoriesAction'


interface ProductBasicInfoProps{
  saveProduct : (product : Product) => void;
  product ?: Product;
  editMode ?: boolean;
}

interface ProductBasicInfoState{
  product ?: Product;
  categories ?: any
}

export class ProductBasicInfo extends React.Component<ProductBasicInfoProps,ProductBasicInfoState>{
  constructor(props){
    super(props);
    this.state = {categories : []}
  }

  private formatDate(key) {
    return this.props.product && (key in this.props.product) ? {[key] : this.props.product[key].split('T')[0]} : {}
  }

  private assertValues(input){
    return { ... this.default(), ...input}
  }

  private withFormattedDates(input){
    return {...input,
            ...this.formatDate('startDate'),
            ...this.formatDate('endDate'),
            ...this.formatDate('effectiveStartDate'),
            ...this.formatDate('effectiveEndDate'),
          };
  }

  componentDidMount(){
    this.loadCategoriesKeys()
  }

  loadCategoriesKeys = () => {
    loadCategoriesIdentsAction().then(idents => {
      this.setState({categories: idents.data})
    })
  }

  private default() : Product{
    return {
      name: '',
      type: 'tangible',
      status : '?',
      price : 0,
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
              initialValues={ this.withFormattedDates(this.assertValues(this.props.product)) }
              validationSchema={ productValidation }
              onSubmit={(values: Product) => this.props.saveProduct(values)}
              render={(props : FormikProps<Product>) => (
                 <Form className="form-horizontal">
                  <Row className='mt-2'>
                    <Col sm={6} className='vertical-divider'>
                      <HFormGroup name='name' display='Product Name'
                                  value={props.values.name}
                                  type='text'
                                  errors={props.touched.name && props.errors.name}
                                  onChange={props.handleChange} />
                      <HFormGroup name='description' display='Description'
                                  value={props.values.description}
                                  type='text'
                                  componentClass='textarea'
                                  onChange={props.handleChange} />
                      <HFormGroup name='price' display='Default Price'
                                  value={props.values.price+""}
                                  type='number'
                                  errors={props.touched.price && props.errors.price}
                                  onChange={props.handleChange} />
                      <HFormGroup name='status' display='Status'
                                  type='text'>
                        <StatusComponent status={props.values.status}/>
                      </HFormGroup>

                    </Col>
                    <Col sm={6}>
                      <Row>
                        <Col sm={6}>
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='type' display='Type'
                                      value={props.values.type}
                                      type='text'
                                      errors={props.touched.type && props.errors.type}
                                      onChange={props.handleChange}/>
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='startDate' display='Start Date'
                                      value={props.values.startDate}
                                      type='date'
                                      errors={props.touched.startDate && props.errors.startDate}
                                      onChange={props.handleChange}  />
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='endDate' display='End Date'
                                      value={props.values.endDate}
                                      errors={props.touched.endDate && props.errors.endDate}
                                      type='date'
                                      onChange={props.handleChange}  />
                        </Col>
                        <Col sm={6}>
                          <HFormGroup display='Category'
                                      name='category'
                                      labelWidth={4}
                                      controlWidth={8}>
                            <FormControl name='category'
                                         value={props.values.category}
                                         onChange={props.handleChange}
                                         componentClass="select" placeholder="select">
                              {this.state.categories && this.state.categories.map(key =>
                                <option key={key.path} value={key._id}>{key.path}</option>)}
                            </FormControl>
                          </HFormGroup>
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='effectiveStartDate' display='Available Date'
                                      value={props.values.effectiveStartDate}
                                      type='date'
                                      errors={props.touched.effectiveStartDate && props.errors.effectiveStartDate}
                                      onChange={props.handleChange}  />
                          <HFormGroup labelWidth={4} controlWidth={8}
                                      name='effectiveEndDate' display='Expiry Date'
                                      value={props.values.effectiveEndDate}
                                      type='date'
                                      errors={props.touched.effectiveEndDate && props.errors.effectiveEndDate}
                                      onChange={props.handleChange}  />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Button bsStyle="primary" type="submit" >Save</Button>
                </Form>
              )}/>
  }
}
