import * as  React from 'react';
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
import { updateAndLoadProductsAction, updateProductAction } from '../../actions/products/UpdateProductAction';
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

}

interface ProductsViewState {
  products : {data : Product[], meta : PageMetadata}
}

export class ProductsView extends React.Component<ProductsViewProps, ProductsViewState> {

  constructor(props){
    super(props);
    this.state = {
      products : {
        data : [],
        meta : {
          total : 0,
          offset : 0,
          pageSize : 5
        }
      }
    };
  }

  createProduct = (product : Product) => {
    createProductAction(product).then((result) => this.loadCurrentPage());
  }

  updateProduct = (product : Product) => {
    updateProductAction(product).then((result) => this.loadCurrentPage());
  }

  removeProduct = (product : Product) => {
    removeAndLoadProductsAction(product).then((result) => this.loadCurrentPage());
  }

  loadProducts = () => {
    loadProductsAction().then((result )=>{
      console.log(result);
    });
  }

  loadPage = (offset,pageSize) => {
    loadProductsPageAction(offset,pageSize).then(result => {
      this.setState({
        products : { data : result.data.data, meta : {
          total : result.data.collCount,
          offset : offset,
          pageSize : pageSize
        }
      }});
    })
  }

  loadCurrentPage = () => {
    this.loadPage(
      this.state.products.meta.offset,
      this.state.products.meta.pageSize)
  }

  componentDidMount(){
    this.loadPage(0,5);
  }

  renderTable() {
     let TableWithRowPlugin = withRowPlugin<Product>({
         triggerIndex : 5,
         rowPlugin: (row : Product, actions : TableRowActions) => {
             return <ProductEditor withHeading={false}
                                   editMode={true}
                                   saveProduct={(product) => this.updateProduct(product) }
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
               rows={this.state.products && this.state.products.data}
               onRemove={ (product) => this.removeProduct(product) }
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
               total= {this.state.products && this.state.products.meta.total}
               offset= {this.state.products && this.state.products.meta.offset}
               getPage={this.loadPage}/>
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <EditorComponent withHeading={true} toggleText='New Product'>
                 <ProductBasicInfo saveProduct={this.createProduct} />
               </EditorComponent>
               {this.renderTable()}
             </CenteredPanel>
  }

}
