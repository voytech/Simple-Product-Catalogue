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
  editRow : () => {};
  removeRow : () => {};
}

export interface TableCellActions {
  editCell : () => {};
}

export interface TableColumnActions {
  applyFilter : () => {};
  sortItems : () => {};
}

interface RenderColumns {
   (columns : Column[]) : React.ReactNode;
}

interface PartiallyAppliedNoArgMarkerInterface{
  () : React.ReactNode
}

interface RenderCells extends PartiallyAppliedNoArgMarkerInterface {};

interface RenderRows extends PartiallyAppliedNoArgMarkerInterface {};

interface TableProps<Row> {
  columns : Column[];
  rows : Row[];
  renderHeader ?: (columns : RenderColumns) => React.ReactNode;
  renderColumn : ((column : Column, actions: TableColumnActions) => React.ReactNode);
  renderBody ? : (rowsRender : RenderRows) => React.ReactNode;
  renderRow ?: ((rowRender : RenderCells, actions: TableRowActions) => React.ReactNode);
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

export function columns(... cols : Column[]){
  return cols;
}

export class TableComponent extends React.Component<TableProps<any>,TableState<any>>{

  constructor(props){
    super(props);
  }

  private renderColumns = () : React.ReactNode => {
    return <>
            {this.props.columns.map((col) => this.props.renderColumn(col,null))}
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

  private renderCells = (cells : Cell[]) : React.ReactNode => {
    return <>
            {cells.map((cell) => this.props.renderCell(cell,null))}
           </>;
  }

  private partialRenderCells = (row, idx : number) : RenderCells => {
    let values : Cell[] = this.props.columns.map((col) => {
      return {
        value  : col.name && row[col.name],
        column : col
      }
    });
    return  () => { return this.renderCells(values) }
  }

  private renderRows = () => {
    return <>{this.props.rows && this.props.rows.map((row, idx : number) => {
            return this.props.renderRow
                   ?
                   this.props.renderRow(this.partialRenderCells(row,idx),null)
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
