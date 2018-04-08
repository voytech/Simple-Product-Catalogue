import * as  React from 'react';
import { RenderHeaderProps, RenderCell, RenderCells, RenderBody,
         TableDataProps, TableActionsProps,
         TableCellActions, TableRowActions,TableColumnActions,
         NoArgRender, TableColumn} from '../TableComponent'
import { editButtonCell } from '../renderers/Basics'

interface RowPluginProps<E>{
  rowPlugin : (row : E, actions: TableRowActions) => React.ReactNode
  renderTrigger ?: NoArgRender
  triggerIndex ?: number
}

type WithRowPluginProps<E> = {rowPlugin ?: (row : E, actions: TableRowActions) => React.ReactNode} &
                             {renderTrigger ?: NoArgRender} &
                             {triggerIndex ?: number} &
                             RenderHeaderProps<E> &
                             TableDataProps<E> &
                             TableActionsProps<E> &
                             RenderCells & RenderCell & RenderBody;

interface WithRowPluginState<M>{
  selection : M
}

export function withRowPlugin<M>(passProps ?: RowPluginProps<M>){
  return (Component) => {
    return class extends React.Component<WithRowPluginProps<M>,WithRowPluginState<M>> {

      constructor(props){
        super(props)
        this.state = {selection : null}
      }

      __props(){
        return {...passProps,...this.props}
      }

      appendHeaderColumn(){
        let cols = this.props.columns.slice()
        cols.splice(this.__props().triggerIndex,0,new TableColumn('Edit'))
        return cols
      }

      appendRowCell(){
        return {...this.props.renderCells, 'Edit' :  this.props.renderTrigger || editButtonCell}
      }

      renderRow = (rowRender : NoArgRender, record : M, actions: TableRowActions) => {
        return <>
                 <tr>{rowRender()}</tr>
                 {this.state.selection && (this.state.selection == record) &&
                   <tr>
                     <td colSpan={999}>
                       {this.__props().rowPlugin(record,actions)}
                     </td>
                   </tr>}
               </>
      }

      toggle(record : M){
        this.setState({selection : (this.state.selection === record ? null : record)})
      }

      render(){
        return <Component {...this.props}
                          columns={ this.appendHeaderColumn() }
                          onEdit={ (record) => {
                            this.toggle(record)
                            this.props.onEdit && this.props.onEdit(record)
                          }}
                          renderRow={this.renderRow}
                          renderCells={this.appendRowCell()}>
               </Component>
      }
    }
  }

}
