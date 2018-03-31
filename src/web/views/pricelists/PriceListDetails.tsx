import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
         Button, Panel,
         Glyphicon,
         ButtonToolbar,
         ListGroup, ListGroupItem, FormControl  } from 'react-bootstrap';
import { PriceList, PriceListItem } from './Model'

interface PriceListDetailsState{
  [name:string] : boolean
}

interface PriceListDetailsProps{
  savePriceList : (product : PriceList) => void;
  priceList ?: PriceList;
  productsKeys ?: [{name:string, _id:string}];
  editMode ?: boolean;
}

export class PriceListDetails extends React.Component<PriceListDetailsProps,PriceListDetailsState>{

  constructor(props){
    super(props);
    this.state = {}

  }

  private toggle(item:{name:string}){
    let state = (item.name in this.state) && this.state[item.name];
    this.setState({ [item.name]: !state })
  }

  private isSelected(item){
    return (item.name in this.state) && this.state[item.name] == true;
  }

  private default() : PriceList{
    return {
      name: '',
      description:'...',
      category: '...',
      type:'...'
    }
  }

  renderEditor = (item) => {
    return  <>
            <input name='price' type='text' style={{width:'100px',
                                                    marginLeft:'5px',
                                                    marginRight:'5px'}} />
            <Button bsSize='xsmall' bsStyle="primary" onClick={() => this.toggle(item)}>
              <Glyphicon glyph='save'/>
            </Button>
            </>
  }

  renderProduct = (item) => {
    return <ListGroupItem key={item.name}>
              <b>{item.name}</b>
              {this.isSelected(item) && this.renderEditor(item)}
              <Button className='pull-right' bsSize='xsmall' bsStyle="success" onClick={() => this.toggle(item)}>
                <Glyphicon glyph='plus'/>
              </Button>
           </ListGroupItem>;
  }

  renderProducts = () => {
    return <div style={{overflow: 'auto', maxHeight: 400}}>
              <ListGroup>
                {this.props.productsKeys && this.props.productsKeys.map(key => this.renderProduct(key))}
              </ListGroup>
            </div>
  }

  render(){
    return <Formik
              enableReinitialize={ this.props.editMode }
              initialValues={ this.default() }
              //validationSchema={ productValidation }
              onSubmit={(values: PriceList) => this.props.savePriceList(values)}
              render={(props : FormikProps<PriceList>) => (
                 <Form className="form-horizontal">
                  <Row className='mt-2'>
                    <Col sm={6} className='vertical-divider'>
                      <Col sm={6} className='vertical-divider'>
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
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title>Assign prices</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                          {this.renderProducts()}
                        </Panel.Body>
                      </Panel>
                    </Col>
                  </Row>
                  <Button bsStyle="primary" type="submit" >Save</Button>
                </Form>
              )}/>
  }
}
