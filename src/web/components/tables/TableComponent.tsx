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

interface PartiallyAppliedNoArgMarkerInterface{
  () : React.ReactNode
}

export interface RenderCellsDef {
  [title : string] : (value : Cell, actions : TableCellActions) => React.ReactNode
}

export interface RenderColumnsDef {
  [title : string] : (value : Column, actions : TableColumnActions) => React.ReactNode
}

export interface RenderCells extends PartiallyAppliedNoArgMarkerInterface {};

export interface RenderRows extends PartiallyAppliedNoArgMarkerInterface {};

export interface TableProps<Row> {
  columns : Column[];
  rows : Row[];
  onEdit   ?: (row : any) => void;
  onRemove ?: (row : any) => void;
  onRemoveMany ?: (options : any) => void;
  renderHeader ?: (columns : RenderColumns) => React.ReactNode;
  renderColumns ?: RenderColumnsDef
  renderColumn : ((column : Column, actions: TableColumnActions) => React.ReactNode);
  renderBody ? : (rowsRender : RenderRows) => React.ReactNode;
  renderRow ?: ((rowRender : RenderCells, row : any, actions: TableRowActions) => React.ReactNode);
  renderCells ?: RenderCellsDef
  renderCell : (value : Cell, actions : TableCellActions) => React.ReactNode;
}

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
export class TableComponent extends React.Component<TableProps<any>,TableState<any>>{

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

  private partialRenderCells = (row, idx : number) : RenderCells => {
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
