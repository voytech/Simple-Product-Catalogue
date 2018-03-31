import * as  React from 'react';
import { connect } from 'react-redux';

import { Formik, Form  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Button,
         Glyphicon  } from 'react-bootstrap';
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
import { createProductAction } from '../../actions/products/CreateProductAction';
import { updateAndLoadProductsAction } from '../../actions/products/UpdateProductAction';
import { removeAndLoadProductsAction } from '../../actions/products/RemoveProductAction';
import { loadProductsAction } from '../../actions/products/LoadProductsAction';
import { ProductEditor } from './ProductEditor';
import { ProductBasicInfo } from './ProductBasicInfo'
import { Product } from './Model'


interface ProductsViewProps{
  createProduct : (product : Product) => void;
  loadProducts : () => void;
  products : Product[];
}

interface ProductsViewState {
  selection ?: Product;
}

class _ProductsView_ extends React.Component<ProductsViewProps, ProductsViewState> {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.loadProducts();
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <EditorComponent withHeading={true} toggleText='New Product'>
                 <ProductBasicInfo saveProduct={this.props.createProduct} />
               </EditorComponent>
               <TableComponent columns={[new TableColumn('Name','name'),
                                         new TableColumn('Type','type'),
                                         new TableColumn('Description','description'),
                                         new TableColumn('Start Date','startDate'),
                                         new TableColumn('Expiry','endDate'),
                                         new TableColumn('Edit'),
                                         new TableColumn('X')]}
                               rows={this.props.products}
                               onEdit={ (product) => this.setState({ selection: product.name }) }
                               onRemove={ (product) => removeAndLoadProductsAction(product) }
                               renderColumn={(column : Column, actions: TableColumnActions) => {
                                 switch  (column.title) {
                                   case 'X' : return <th key={column.title}>
                                                       <Button bsStyle='danger' bsSize='xsmall' onClick={() => alert('removing all')}>
                                                         <Glyphicon glyph='trash' />
                                                       </Button>
                                                     </th>
                                   default  : return <th>{column.title}</th>
                                 }
                               }}
                               renderCell={(cell : Cell, actions : TableCellActions) => {
                                 switch (cell.column.title){
                                   case 'Edit' : return <td key={cell.column.title}>
                                                          <Button bsSize='xsmall' onClick={() => actions.editRow()}>
                                                            <Glyphicon glyph='pencil' />
                                                          </Button>
                                                        </td>
                                   case 'X' : return <td key={cell.column.title}>
                                                        <Button bsSize='xsmall'  type='button' onClick={(e) => actions.removeRow()}>
                                                          <Glyphicon glyph='trash' />
                                                        </Button>
                                                      </td>
                                   case 'Start Date': case 'Expiry': return <td key={cell.column.title}>{cell.value.split('T')[0]}</td>
                                   default     : return <td key={cell.column.title}>{cell.value}</td>
                                 }
                               }}
                               renderRow={(rowRender : RenderCells, row : any, actions: TableRowActions) => {
                                 return <>
                                          <tr>{rowRender()}</tr>
                                          {this.state.selection && (this.state.selection == row.name) &&
                                            <tr>
                                              <td colSpan={7}>
                                                <ProductEditor withHeading={false}
                                                               editMode={true}
                                                               saveProduct={(product) => updateAndLoadProductsAction(product) }
                                                               product={row}/>
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

export const ProductsView = connect(mapStateToProps, mapDispatchToProps)(_ProductsView_);
