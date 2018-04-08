import * as  React from 'react';
import { TableComponent,
         RenderHeaderProps, RenderCell, RenderCells, RenderBody,
         TableDataProps, TableActionsProps,
         Column, Cell,Row,
         TableCellActions, TableRowActions,TableColumnActions,
         NoArgRender,
         RenderColumns, RenderColumnsDef,RenderCellsDef } from '../TableComponent'
import { editButtonCell } from '../renderers/Basics'

interface RowPluginProps<E>{
  rowPlugin : (row : E, actions: TableRowActions) => React.ReactNode
  renderTrigger ?: NoArgRender
}

type WithRowPluginProps<E> = RowPluginProps<E> &
                             RenderHeaderProps<E> &
                             TableDataProps<E> &
                             TableActionsProps<E> &
                             RenderCells & RenderCell & RenderBody;

interface WithRowPluginState<M>{
  selection : M
}

export function withRowPlugin<M>(){
  return (Component) => {
    return class extends React.Component<WithRowPluginProps<M>,WithRowPluginState<M>> {

      constructor(props){
        super(props)
        this.state = {selection : null}
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
                       {this.props.rowPlugin(record,actions)}
                     </td>
                   </tr>}
               </>
      }

      toggle(record : M){
        this.setState({selection : (this.state.selection === record ? null : record)})
      }

      render(){
        return <Component {...this.props}
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
