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
import { CenteredPanel } from '../../components/CenteredPanel';
import { PriceListDetails } from './PriceListDetails';
import { NewPriceList } from './NewPriceList';
import { PriceListEditor } from './PriceListEditor';
import { createPriceListAction } from '../../actions/pricelists/CreatePricelistAction';
import { loadPriceListsAction } from '../../actions/pricelists/LoadPriceListsAction';
import { loadPriceListAction } from '../../actions/pricelists/LoadPriceListAction';
import { loadProductsIdentsAction } from '../../actions/products/LoadProductsAction';
import { addPriceListItemAction } from '../../actions/pricelists/AddPriceListItemAction';
import { dateOnly } from '../Utils'
import { PriceList, PriceListItem, PriceAssignement } from '../../actions/pricelists/Model'
import { Product  } from '../../actions/products/Model'
import { editButtonCell, removeButtonCell, dateCell, defaultTextCell,
         removeButtonColumn, defaultTextColumn } from '../../components/tables/renderers/Basics'
import { withRowPlugin } from '../../components/tables/extensions/RowPlugins'


interface PriceListViewProps{
  createPricelist : (pricelist : PriceList) => void;
  loadPricelists : () => void;
  loadPriceList : (name : string) => void;
  loadProductsKeys : () => void;
  addPriceListItem : (item : PriceAssignement)=> void;
  pricelists : PriceList[];
  productsKeys : [{_id:string, name:string}];
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
    this.props.loadProductsKeys();
  }

  renderTable(){
    let TableWithRowPlugin = withRowPlugin<PriceList>({
        triggerIndex : 4,
        rowPlugin: (row : PriceList, actions : TableRowActions) => {
            return <PriceListEditor
                     addPriceListItem={(item : PriceAssignement) => this.props.addPriceListItem(item)}
                     updatePriceList={(item : PriceList) => actions.editRow()}
                     productsKeys={this.props.productsKeys}
                     priceList={row}
                     loadPriceList={this.props.loadPriceList}/>
       }
    })(TableComponent)
    return  <TableWithRowPlugin
                columns={[new TableColumn('Name','name'),
                          new TableColumn('Description','description'),
                          new TableColumn('Start Date','startDate'),
                          new TableColumn('Expiry','endDate'),
                          new TableColumn('X')]}
                 rows={this.props.pricelists}
                 onRemove={ (prs) =>  null }
                 renderColumns={ {
                   'X'  : removeButtonColumn
                 } }
                 renderColumn={ defaultTextColumn }
                 renderCells={ {
                   'X'         : removeButtonCell,
                   'Start Date': dateCell,
                   'Expiry'    : dateCell
                 } }
                 renderCell={ defaultTextCell } />
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <EditorComponent withHeading={true} toggleText='New Price List'>
                 <NewPriceList createPriceList={this.props.createPricelist} />
               </EditorComponent>
               {this.renderTable()}
             </CenteredPanel>
  }

}

const mapStateToProps = (state) => ({
  pricelists: state.global.pricelists,
  productsKeys : state.global.dictionary && state.global.dictionary.products
});

const mapDispatchToProps = () => ({
  createPricelist : (priceList : PriceList) => {
    createPriceListAction(priceList);
  },
  loadPricelists  : () => {
    loadPriceListsAction();
  },
  loadPriceList : (name:string) => {
    loadPriceListAction(name);
  },
  loadProductsKeys : () => {
    loadProductsIdentsAction();
  },
  addPriceListItem : (item : PriceAssignement) => {
    addPriceListItemAction(item);
  }
});

export const PriceListsView = connect(mapStateToProps, mapDispatchToProps)(_PriceListsView_);
