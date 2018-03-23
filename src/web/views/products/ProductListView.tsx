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
         Glyphicon,
         ButtonToolbar  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'
import { TableComponent,
         columns,
         Column,
         Cell,
         TableColumn,
         TableColumnActions,
         TableCellActions,
         TableRowActions } from '../../components/lists/TableComponent'
import { CenteredPanel } from '../../components/CenteredPanel';
import { push } from 'react-router-redux';
import { store } from '../../Store';
import { createProduct } from '../../actions/products/CreateProductAction';
import { removeProductAction } from '../../actions/products/RemoveProductAction';
import { loadProductsAction } from '../../actions/products/LoadProductsAction';


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
  loadProducts : () => void;
  products : IProduct[];
}

class _ProductListView_ extends React.Component<IProductListViewProps> {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.loadProducts();
  }

  componentWillReceiveProps(props){
    console.log("received props");
    console.log(props);
  }

  private renderDetails(){
    return  <Formik
              initialValues={{ type : 'tangible' }}
              validate={values => {}}
              onSubmit={(values: IProduct) => this.props.createProduct(values)}
              render={(props : FormikProps<IProduct>) => (
                <Form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <Row className='mt-2'>
                    <HFormGroup name='name' display='Product Name' value={props.values.name} type='text' onChange={props.handleChange} controlWidth={4}/>
                    <HFormGroup name='type' display='Type' value={props.values.type} type='text' onChange={props.handleChange} controlWidth={4}/>
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
      return <CenteredPanel lg={12} sm={12} md={12}>
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
                 <TableComponent columns={[new TableColumn('Name','name'),
                                           new TableColumn('Type','type'),
                                           new TableColumn('Description','description'),
                                           new TableColumn('Start Date','startDate'),
                                           new TableColumn('Expiry','endDate'),
                                           new TableColumn('Edit'),
                                           new TableColumn('X')]}
                                 rows={this.props.products}
                                 onRemove={ (product) => removeProductAction(product) }
                                 renderColumn={(column : Column, actions: TableColumnActions) => {
                                   switch  (column.title) {
                                     case 'X' : return <th>
                                                         <Button bsStyle='danger' bsSize='xsmall' onClick={() => alert('removing all')}>
                                                           <Glyphicon glyph='trash' />
                                                         </Button>
                                                       </th>
                                     default  : return <th>{column.title}</th>
                                   }
                                 }}
                                 renderCell={(cell : Cell, actions : TableCellActions) => {
                                   switch (cell.column.title){
                                     case 'Edit' : return <td>
                                                            <Button bsSize='xsmall' onClick={() => actions.editRow()}>
                                                              <Glyphicon glyph='pencil' />
                                                            </Button>
                                                          </td>
                                     case 'X' : return <td>
                                                          <Button bsSize='xsmall' onClick={() => actions.removeRow()}>
                                                            <Glyphicon glyph='trash' />
                                                          </Button>
                                                        </td>
                                     default     : return <td>{cell.value}</td>
                                   }
                                 }}/>
             </CenteredPanel>
  }

}

const mapStateToProps = (state) => ({
  products: state.global.products
});

const mapDispatchToProps = () => ({
  createProduct : (product : IProduct) => {
    createProduct(product);
  },
  loadProducts  : () => {
    loadProductsAction();
  }
});

export const ProductListView = connect(mapStateToProps, mapDispatchToProps)(_ProductListView_);
