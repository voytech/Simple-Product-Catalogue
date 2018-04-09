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
         NoArgRender,
         TableRowActions } from '../../components/tables/TableComponent'
import { withRowPlugin } from '../../components/tables/extensions/RowPlugins'
import { withPagination } from '../../components/tables/extensions/Pagination'
import { editButtonCell, removeButtonCell, dateCell, defaultTextCell,
         removeButtonColumn, defaultTextColumn } from '../../components/tables/renderers/Basics'
import { CenteredPanel } from '../../components/CenteredPanel';
import { createProductAction } from '../../actions/products/CreateProductAction';
import { updateAndLoadProductsAction } from '../../actions/products/UpdateProductAction';
import { removeAndLoadProductsAction } from '../../actions/products/RemoveProductAction';
import { loadProductsAction } from '../../actions/products/LoadProductsAction';
import { loadProductsPageAction } from '../../actions/products/LoadPageAction';
import { ProductEditor } from './ProductEditor';
import { ProductBasicInfo } from './ProductBasicInfo'
import { Product } from '../../actions/products/Model'
import { dateOnly } from '../Utils'

interface PageMetadata{
  total : number,
  offset : number,
  pageSize : number
}

interface ProductsViewProps{
  createProduct : (product : Product) => void;
  removeProduct : (product : Product) => void;
  updateProduct : (product : Product) => void;
  loadProducts : () => void;
  loadPage: (offset:number,size:number) => void;
  products : {data : Product[], meta : PageMetadata}
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
    this.props.loadPage(0,5);
  }

  renderTable() {
     let TableWithRowPlugin = withRowPlugin<Product>({
         triggerIndex : 5,
         rowPlugin: (row : Product, actions : TableRowActions) => {
             return <ProductEditor withHeading={false}
                                   editMode={true}
                                   saveProduct={(product) => this.props.updateProduct(product) }
                                   product={row}/>
        }
     })(TableComponent)

     let TableEx = withPagination<Product>()(TableWithRowPlugin)

     return <TableEx
              columns={[new TableColumn('Name','name'),
                        new TableColumn('Type','type'),
                        new TableColumn('Description','description'),
                        new TableColumn('Start Date','startDate'),
                        new TableColumn('Expiry','endDate'),
                        new TableColumn('X')]}
               rows={this.props.products && this.props.products.data}
               onRemove={ (product) => this.props.removeProduct(product) }
               renderColumns={{
                 'X'  : removeButtonColumn
               }}
               renderColumn={ defaultTextColumn }
               renderCells={{
                 'X'         : removeButtonCell,
                 'Start Date': dateCell,
                 'Expiry'    : dateCell
               }}
               renderCell={ defaultTextCell }
               //Props from paging HoC
               pageSize={5}
               total= {this.props.products && this.props.products.meta.total}
               offset= {this.props.products && this.props.products.meta.offset}
               getPage={this.props.loadPage}/>
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <EditorComponent withHeading={true} toggleText='New Product'>
                 <ProductBasicInfo saveProduct={this.props.createProduct} />
               </EditorComponent>
               {this.renderTable()}
             </CenteredPanel>
  }

}

const mapStateToProps = (state) => ({
  products: state.global.products,
});

const mapDispatchToProps = () => ({
  createProduct : (product : Product) => {
    createProductAction(product);
  },
  updateProduct : (product : Product) => {
    updateAndLoadProductsAction(product);
  },
  removeProduct : (product : Product) => {
    removeAndLoadProductsAction(product);
  },
  loadProducts  : () => {
    loadProductsAction();
  },
  loadPage : (offset,pageSize) => {
    loadProductsPageAction(offset,pageSize)
  }
});

export const ProductsView = connect(mapStateToProps, mapDispatchToProps)(_ProductsView_);
