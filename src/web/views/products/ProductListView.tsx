import * as  React from 'react';
import { connect } from 'react-redux';

import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FormGroup,
         FormControl,
         HelpBlock,
         ControlLabel,
         Col, Row,
         Button,
         ButtonToolbar  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'
import { ListViewComponent } from '../../components/lists/ListViewComponent'
import { CenteredPanel } from '../../components/CenteredPanel';
import { push } from 'react-router-redux';
import { store } from '../../Store';
import { createProduct } from '../../actions/products/CreateProductAction';


interface IProperty {
  name : string;
  value : string;
}

interface IProduct {
  name: string;
  type: string;
  code: string;
  category : string;
  description: string;
  startDate : string;
  effectiveStartDate : string;
  endDate : string;
  effectiveEndDate : string;
  tags: string[];
  properties : IProperty[];
  images : string[];
  attachments : string[];
}

interface IProductListViewProps{
  createProduct : (product : IProduct) => void;
  products : IProduct[];
}

class _ProductListView_ extends React.Component<IProductListViewProps> {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  private renderDetails(){
    return  <Formik
              initialValues={{ }}
              validate={values => {}}
              onSubmit={(values: IProduct) => this.props.createProduct(values)}
              render={(props : FormikProps<IProduct>) => (
                <Form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <Row className='mt-2'>
                    <HFormGroup name='name' display='Product Name' value={props.values.name} type='text' onChange={props.handleChange} controlWidth={4}/>
                    <HFormGroup name='type' display='Type' value={props.values.type || 'tangible'} type='text' onChange={props.handleChange} controlWidth={4}/>
                    <HFormGroup name='description' display='Description' value={props.values.description} type='text' componentClass='textarea' onChange={props.handleChange} controlWidth={6}/>
                    <HFormGroup name='category' display='Category' value={props.values.category} type='text' onChange={props.handleChange} controlWidth={4} />
                    <HFormGroup name='startDate' display='Start Date' value={props.values.startDate} type='date' onChange={props.handleChange} controlWidth={4} />
                    <HFormGroup name='endDate' display='End Date' value={props.values.endDate} type='date' onChange={props.handleChange} controlWidth={4} />
                    <HFormGroup name='effectiveStartDate' display='Effective Start Date' value={props.values.effectiveStartDate} type='date' onChange={props.handleChange} controlWidth={4} />
                    <HFormGroup name='effectiveEndDate' display='Effective End Date' value={props.values.effectiveEndDate} type='date' onChange={props.handleChange} controlWidth={4} />
                  </Row>
                  <Button bsStyle="primary" type="submit" >Create</Button>
                </Form>
              )}/>
  }
  render(){
      return <CenteredPanel lg={10} sm={6} md={10}>
                <EditorComponent title="Create New Product">
                  <EditorStep title="Basic Details" step={1}>
                    {this.renderDetails()}
                  </EditorStep>
                  <EditorStep title="Images" step={2}>
                    <div>Images</div>
                  </EditorStep>
                  <EditorStep title="Attachments" step={3}>
                    <div>Attachments</div>
                  </EditorStep>
                 </EditorComponent>
                 <ListViewComponent columns={["Name","Description","Start Date","End Date"]}></ListViewComponent>
             </CenteredPanel>
  }

}

const mapStateToProps = (state) => {
  return ({...state.global.products});
};

const mapDispatchToProps = (dispatch) => ({
  createProduct : (product : IProduct) => {
    createProduct(product);
  },
  loadProducts : () => {
    //dispatch(loadProductsAction());
  }
});

export const ProductListView = connect(mapStateToProps, mapDispatchToProps)(_ProductListView_);
