import * as  React from 'react';
import { connect } from 'react-redux';

import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
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
         RenderCells,
         TableRowActions } from '../../components/lists/TableComponent'
import { CenteredPanel } from '../../components/CenteredPanel';
import { push } from 'react-router-redux';
import { store } from '../../Store';
import { createProductAction } from '../../actions/products/CreateProductAction';
import { updateProductAction,
         updateAndLoadProductsAction } from '../../actions/products/UpdateProductAction';
import { removeProductAction,
         removeAndLoadProductsAction} from '../../actions/products/RemoveProductAction';
import { loadProductsAction } from '../../actions/products/LoadProductsAction';
import { ProductEditor } from './ProductEditor';
import { Product, ProductProperty } from './Model'


interface ProductListViewProps{
  createProduct : (product : Product) => void;
  loadProducts : () => void;
  products : Product[];
}

interface ProductListViewState {
  selection ?: Product;
}

class _ProductListView_ extends React.Component<ProductListViewProps, ProductListViewState> {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.loadProducts();
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <ProductEditor withHeading={true} saveProduct={this.props.createProduct} />
               <TableComponent columns={[new TableColumn('Name','name'),
                                         new TableColumn('Type','type'),
                                         new TableColumn('Description','description'),
                                         new TableColumn('Start Date','startDate'),
                                         new TableColumn('Expiry','endDate'),
                                         new TableColumn('Edit'),
                                         new TableColumn('X')]}
                               rows={this.props.products}
                               onEdit={ (product) => this.setState({ selection: product }) }
                               onRemove={ (product) => removeAndLoadProductsAction(product) }
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
                                                        <Button bsSize='xsmall'  type='button' onClick={(e) => actions.removeRow()}>
                                                          <Glyphicon glyph='trash' />
                                                        </Button>
                                                      </td>
                                   case 'Start Date': case 'Expiry': return <td>{cell.value.split('T')[0]}</td>
                                   default     : return <td>{cell.value}</td>
                                 }
                               }}
                               renderRow={(rowRender : RenderCells, row : any, actions: TableRowActions) => {
                                 return <>
                                          <tr>{rowRender()}</tr>
                                          {this.state.selection && (this.state.selection == row) &&
                                            <tr>
                                              <td colSpan={7}>
                                                <ProductEditor withHeading={false}
                                                               editMode={true}
                                                               saveProduct={(product) => updateAndLoadProductsAction(product) }
                                                               product={this.state.selection}/>
                                              </td>
                                            </tr>}
                                        </>
                               }}/>
             </CenteredPanel>
  }

}

const mapStateToProps = (state) => ({
  products: state.global.products
});

const mapDispatchToProps = () => ({
  createProduct : (product : Product) => {
    createProductAction(product);
  },
  loadProducts  : () => {
    loadProductsAction();
  }
});

export const ProductListView = connect(mapStateToProps, mapDispatchToProps)(_ProductListView_);
