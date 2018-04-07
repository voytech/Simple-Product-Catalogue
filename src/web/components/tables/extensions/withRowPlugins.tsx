import * as  React from 'react';
import { TableComponent,
         TableProps,
         Column,
         Cell,TableCellActions,
         TableRowActions,RenderCells,
         RenderColumns, RenderColumnsDef,
         RenderCellsDef,
         RenderRows, TableColumnActions,
         Row } from '../TableComponent'
import { editButtonCell } from '../renderers/Basics'

interface WithRowPluginProps<E> extends TableProps<E>{
  rowPlugin : () => React.ReactNode
  renderTrigger : () => React.ReactNode
}

interface WithRowPluginState<M>{
  selection : M
}

export function withRowPlugin<E,M>(props : TableProps<M>){
  return (Component) => {
    return class extends React.Component<WithRowPluginProps<M>,WithRowPluginState<M>> {
      constructor(props){
        super(props)
        this.state = {selection : null}
      }

      appendColumn(){
        return this.props.columns
      }

      appendRowCell(){
        return {...this.props.renderCells, 'Edit' :  this.props.renderTrigger || editButtonCell}
      }

      renderRow(rowRender : RenderCells, record : M, actions: TableRowActions){
        return <>
                 <tr>{rowRender()}</tr>
                 {this.state.selection && (this.state.selection == record) &&
                   <tr>
                     <td colSpan={999}>
                       {this.props.rowPlugin()}
                     </td>
                   </tr>}
               </>
      }

      toggle(record : M){
        this.setState({selection : (this.state.selection === record ? null : record)})
      }

      render(){
        return <Component {...this.props}
                          onEdit={ (record) => this.toggle(record) }
                          renderRow={this.renderRow}
                          rowCells={this.appendRowCell()}>
               </Component>
      }
    }
  }

}
