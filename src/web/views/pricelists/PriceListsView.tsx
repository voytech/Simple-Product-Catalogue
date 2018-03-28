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
//import { createProductAction } from '../../actions/products/CreateProductAction';
//import { updateAndLoadProductsAction } from '../../actions/products/UpdateProductAction';
//import { removeAndLoadProductsAction } from '../../actions/products/RemoveProductAction';
//import { loadProductsAction } from '../../actions/products/LoadProductsAction';

import { PriceList, PriceListItem } from './Model'
import { Product  } from '../products/Model'


interface PriceListViewProps{
  createPricelist : (pricelist : PriceList) => void;
  loadPricelists : () => void;
  pricelists : PriceList[];
}

interface PriceListViewState {
  selection ?: string;
}

class _PriceListsView_ extends React.Component<PriceListViewProps, PriceListViewState> {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.loadPricelists();
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <EditorComponent withHeading={true} toggleText='New Product'>

               </EditorComponent>
               <TableComponent columns={[new TableColumn('Name','name'),
                                         new TableColumn('Description','description'),
                                         new TableColumn('Start Date','startDate'),
                                         new TableColumn('Expiry','endDate'),
                                         new TableColumn('Edit'),
                                         new TableColumn('X')]}
                               rows={this.props.pricelists}
                               onEdit={ (prs) => this.setState({ selection: prs.name }) }
                               onRemove={ (prs) => {return null;} }
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
  createProduct : (priceList : PriceList) => {
    //createPriceListAction(priceList);
  },
  loadProducts  : () => {
    //loadPriceListsAction();
  }
});

export const PriceListsView = connect(mapStateToProps, mapDispatchToProps)(_PriceListsView_);
