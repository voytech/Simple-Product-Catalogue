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

}

interface PriceListViewState {
  pricelists : PriceList[];
  productsKeys : [{_id:string, name:string}];
}

export class PriceListsView extends React.Component<PriceListViewProps, PriceListViewState> {

  constructor(props){
    super(props);
    this.state = { pricelists : [], productsKeys : [null]}
  }

  createPricelist = (pricelist : PriceList) => {
    createPriceListAction(pricelist).then(result => this.loadPricelists())
  }

  loadPricelists = () => {
    loadPriceListsAction().then(result => this.setState({pricelists: result.data}))
  }

  loadPriceList = (name : string) => {
    loadPriceListAction(name).then(result => console.log(result))
  }

  loadProductsKeys = () => {
    loadProductsIdentsAction().then(idents => this.setState({productsKeys: idents.data}))
  }

  addPriceListItem = (item : PriceAssignement)=> {

  }

  componentDidMount(){
    this.loadPricelists();
    this.loadProductsKeys();
  }

  renderTable(){
    let TableWithRowPlugin = withRowPlugin<PriceList>({
        triggerIndex : 4,
        rowPlugin: (row : PriceList, actions : TableRowActions) => {
            return <PriceListEditor
                     addPriceListItem={(item : PriceAssignement) => this.addPriceListItem(item)}
                     updatePriceList={(item : PriceList) => actions.editRow()}
                     productsKeys={this.state.productsKeys}
                     priceList={row}
                     loadPriceList={this.loadPriceList}/>
       }
    })(TableComponent)
    return  <TableWithRowPlugin
                columns={[new TableColumn('Name','name'),
                          new TableColumn('Description','description'),
                          new TableColumn('Start Date','startDate'),
                          new TableColumn('Expiry','endDate'),
                          new TableColumn('X')]}
                 rows={this.state.pricelists}
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
                 <NewPriceList createPriceList={this.createPricelist} />
               </EditorComponent>
               {this.renderTable()}
             </CenteredPanel>
  }

}
