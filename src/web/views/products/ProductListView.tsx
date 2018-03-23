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
import { removeProductAction } from '../../actions/products/RemoveProductAction';
import { loadProductsAction } from '../../actions/products/LoadProductsAction';
import { ProductEditor, Product, ProductProperty } from './ProductEditor';


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
                <EditorComponent title='' createText='Create New Product'>
                  <EditorStep title="Basic Details" step={1}>
                    <ProductEditor editMode={true} saveProduct={this.props.createProduct} product={this.state.selection}/>
                  </EditorStep>
                  <EditorStep title="Images" step={2}>
                    <div>Images</div>
                  </EditorStep>
                  <EditorStep title="3d Visualisation" step={3}>
                    <div>3D Models</div>
                  </EditorStep>
                  <EditorStep title="Attachments" step={4}>
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
                                 onEdit={ (product) => this.setState({ selection: product }) }
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
                                 }}
                                 renderRow={(rowRender : RenderCells, row : any, actions: TableRowActions) => {
                                   return <>
                                            <tr>{rowRender()}</tr>
                                            {this.state.selection && (this.state.selection == row) &&
                                              <tr>
                                                <td colSpan={7}>
                                                  <ProductEditor editMode={true}
                                                                 saveProduct={() => actions.commit()}
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
