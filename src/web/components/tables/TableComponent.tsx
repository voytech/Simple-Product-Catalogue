import * as  React from 'react';
import { Table   } from 'react-bootstrap';

export interface Column {
  name ?: string;
  title : string;
}

export type Row<Model> = {
  [key in keyof Model] : any;
}

export interface Cell  {
  value : any;
  column : Column;
}

export interface TableRowActions {
  editRow : () => void;
  removeRow : () => void;
}

export interface TableCellActions {
  editRow : () => void;
  removeRow : () => void;
  editValue : () => void;
}

export interface TableColumnActions {
  applyFilter : () => void;
  sortItems : () => void;
  removeData : () => void;
}

export interface RenderColumns {
   (columns : Column[]) : React.ReactNode;
}

export interface NoArgRender{
  () : React.ReactNode
}

export interface RenderCellsDef {
  [title : string] : (value : Cell, actions : TableCellActions) => React.ReactNode
}

export interface RenderColumnsDef {
  [title : string] : (value : Column, actions : TableColumnActions) => React.ReactNode
}

// =============================================================================
// Type-Grained Table PROPS Approach.
// For ease of distributing functionalities acros various higher order components.
// =============================================================================
export interface TableColumns {
  columns : Column[]
}

export interface TableRows<R> {
  rows : R[]
}

export interface TableEditAction<R>{
  onEdit ?: (row : R) => void;
}

export interface TableRemoveAction<R>{
  onRemove ?: (row : R) => void;
}
export interface TableRemoveManyAction{
  onRemoveMany ?: (options : any) => void;
}

export interface RenderHeader{
  renderHeader ?: (columns : RenderColumns) => React.ReactNode;
}

export interface RenderColumns{
  renderColumns ?: RenderColumnsDef
}

export interface RenderColumn{
  renderColumn : ((column : Column, actions: TableColumnActions) => React.ReactNode);
}

export interface RenderBody{
  renderBody ? : (rowsRender : NoArgRender) => React.ReactNode;
}

export interface RenderRow<R>{
  renderRow ?: ((rowRender : NoArgRender, row : R, actions: TableRowActions) => React.ReactNode);
}

export interface RenderCells{
  renderCells ?: RenderCellsDef
}

export interface RenderCell{
  renderCell : (value : Cell, actions : TableCellActions) => React.ReactNode;
}

export type TableDataProps<R> = TableColumns &
                                TableRows<R>;

export type TableActionsProps<R> =  TableEditAction<R> &
                                    TableRemoveAction<R> &
                                    TableRemoveManyAction;

export type RenderHeaderProps<R> =  RenderHeader &
                                    RenderColumns &
                                    RenderColumn;

export type RenderBodyProps<R> =  RenderBody &
                                  RenderRow<R> &
                                  RenderCells &
                                  RenderCell;

export type TableProps<R> = TableDataProps<R> &
                            TableActionsProps<R> &
                            RenderHeaderProps<R> &
                            RenderBodyProps<R>;

interface TableState<Row> {
  rows : Row[];
}

export class TableColumn implements Column {
  constructor(public title : string,public name ?: string) {}
}

export class TableColumns {
    columns : Column[];
    constructor(...columns : Column[]){
      this.columns = columns;
    }
}

//---------------- Helper statics for property passing.

export function columns(... cols : Column[]){
  return cols;
}
//----------------------------------------------------
export class TableComponent<M> extends React.Component<TableProps<M>,TableState<M>>{

  constructor(props){
    super(props);
  }

  private renderColumns = () : React.ReactNode => {
    return <>
            {this.props.columns.map((col) => {
              return this.props.renderColumns && (col.title in this.props.renderColumns)
              ?
              this.props.renderColumns[col.title](col,null)
              :
              this.props.renderColumn(col,null)
            })}
           </>;
  }

  private renderHeader = () => {
    return this.props.renderHeader ?
      this.props.renderHeader(this.renderColumns)
      :
      <thead>
        <tr>
         { this.renderColumns() }
        </tr>
      </thead>
  }

  private renderCells = (cells : Cell[], actions : TableCellActions) : React.ReactNode => {
    return <>
            {cells.map((cell) => {
              return this.props.renderCells && (cell.column.title in this.props.renderCells)
                     ?
                     this.props.renderCells[cell.column.title](cell,actions)
                     :
                     this.props.renderCell(cell,actions)
            })}
           </>;
  }

  private withThrow = (action , arg) => {
    if (!action){
      throw Error('action handler not set on TableComponent '+action);
    }
    action(arg);
  }

  private partialRenderCells = (row, idx : number) : NoArgRender => {
    let contextAwareActions : TableCellActions = {
        editValue : () => { this.withThrow(this.props.onEdit,row) },
        editRow :   () => { this.withThrow(this.props.onEdit,row) },
        removeRow : () => { this.withThrow(this.props.onRemove,row) }
    }
    let values : Cell[] = this.props.columns.map((col) => {
      return {
        value  : col.name && row[col.name],
        column : col
      }
    })
    return  () => { return this.renderCells(values,contextAwareActions) }
  }

  private createContextAwareRowActions = (row, idx : number) => {
    return {
        editRow :   () => { this.withThrow(this.props.onEdit,row) },
        removeRow : () => { this.withThrow(this.props.onRemove,row) }
    }
  }

  private renderRows = () => {
    return <>{this.props.rows && this.props.rows.map((row, idx : number) => {
            return this.props.renderRow
                   ?
                   this.props.renderRow(this.partialRenderCells(row,idx),row,this.createContextAwareRowActions(row,idx))
                   :
                   <tr key={idx}>
                     { this.partialRenderCells(row,idx)() }
                   </tr>
           })}
          </>
  }

  private renderBody = () => {
    return this.props.renderBody ?
      this.props.renderBody(this.renderRows)
      :
      <tbody>
         { this.renderRows() }
      </tbody>
  }

  render(){
      return <Table responsive>
                { this.renderHeader() }
                { this.renderBody() }
             </Table>;
  }
}
