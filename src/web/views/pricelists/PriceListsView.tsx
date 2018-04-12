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
import { NewPriceList } from './NewPriceList';
import { PriceListEditor } from './PriceListEditor';
import { createPriceListAction } from '../../actions/pricelists/CreatePricelistAction';
import { loadPriceListsAction } from '../../actions/pricelists/LoadPriceListsAction';
import { loadPriceListAction } from '../../actions/pricelists/LoadPriceListAction';
import { loadPricelistsPageAction } from '../../actions/pricelists/LoadPageAction';
import { updatePriceListAction } from '../../actions/pricelists/UpdatePriceListAction';
import { loadProductsIdentsAction } from '../../actions/products/LoadProductsAction';
import { addPriceListItemAction } from '../../actions/pricelists/AddPriceListItemAction';
import { dateOnly } from '../Utils'
import { PriceList, PriceListItem, PriceAssignement } from '../../actions/pricelists/Model'
import { Product  } from '../../actions/products/Model'
import { editButtonCell, removeButtonCell, dateCell, defaultTextCell,
         removeButtonColumn, defaultTextColumn } from '../../components/tables/renderers/Basics'
import { withRowPlugin } from '../../components/tables/extensions/RowPlugins'
import { withPagination } from '../../components/tables/extensions/Pagination'


interface PageMetadata{
  total : number,
  offset : number,
  pageSize : number
}

interface PriceListViewProps{

}

interface PriceListViewState {
  pricelists : {data : PriceList[], meta ?: PageMetadata}
}

export class PriceListsView extends React.Component<PriceListViewProps, PriceListViewState> {

  constructor(props){
    super(props);
    this.state = {
      pricelists : {
        data : [],
        meta : {
          total : 0,
          offset : 0,
          pageSize : 5
        }
      }
    };
  }

  private replace(priceList : PriceList){
    let replaced = this.state.pricelists.data.map(p => p.name == priceList.name ? priceList : p);
    this.setState({pricelists : {...this.state.pricelists, data : replaced}})
  }

  createPricelist = (pricelist : PriceList) => {
    createPriceListAction(pricelist).then(result => this.loadPricelists())
  }

  loadPricelists = () => {
    loadPriceListsAction().then(result => this.setState({pricelists: {data : result.data}}))
  }

  loadPage = (offset, size) => {
    loadPricelistsPageAction(offset, size).then(result => { return this.setState({
      pricelists: {
        data : result.data.data,
        meta : {offset:offset, pageSize:size, total: result.data.collCount}
      }
    })})
  }

  loadPriceList = (name : string) : Promise<{data : PriceList}> => {
    return loadPriceListAction(name)
  }

  updatePriceList = (priceList : PriceList) : Promise<{data : PriceList}> => {
    return updatePriceListAction(priceList).then(result => {
      this.replace(result.data)
      return result
    })
  }

  componentDidMount(){
    this.loadPage(
      this.state.pricelists.meta.offset,
      this.state.pricelists.meta.pageSize
    )
  }

  renderTable(){
    let TableWithRowPlugin = withRowPlugin<PriceList>({
        triggerIndex : 4,
        rowPlugin: (row : PriceList, actions : TableRowActions) => {
            return <PriceListEditor
                     priceList={row}
                     updatePriceList={this.updatePriceList}
                     loadPriceList={this.loadPriceList}/>
       }
    })(TableComponent)
    let TableEx = withPagination<PriceList>({
      pageSize : 5,
      total : this.state.pricelists && this.state.pricelists.meta.total,
      offset : this.state.pricelists && this.state.pricelists.meta.offset,
      getPage : this.loadPage
    })(TableWithRowPlugin)

    return  <TableEx
                columns={[new TableColumn('Name','name'),
                          new TableColumn('Description','description'),
                          new TableColumn('Start Date','startDate'),
                          new TableColumn('Expiry','endDate'),
                          new TableColumn('X')]}
                 rows={this.state.pricelists && this.state.pricelists.data}
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
