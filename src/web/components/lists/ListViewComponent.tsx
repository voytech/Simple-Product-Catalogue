import * as  React from 'react';
import { Table   } from 'react-bootstrap';

interface IColumn {
  name : string,
  title : string,
}

interface IListViewProps {
  columns : IColumn [];
  rows ?: object [];
  select ?: Function;
  fetch ?: Function;
}

export class Column implements IColumn {
  constructor(public name : string, public title : string) {}
}

export class Columns {
    columns : IColumn[];
    constructor(...columns : IColumn[]){
      this.columns = columns;
    }
}

export function columns(... cols : Column[]){
  return cols;
}

export class ListViewComponent extends React.Component<IListViewProps>{

  constructor(props){
    super(props);
  }

  createHeader(columns : IColumn[]){
    return <tr>
            {columns.map(col=> <th>{col.title}</th>)}
           </tr>
  }

  createRows(){
    return <tbody>
             {this.props.rows && this.props.rows.map((row,idx) => {
              console.log('dupa');
              console.log(row);
              return <tr key={idx}>
                      {this.props.columns.map((col,idx2) =>{ return <td key={idx2}>{row[col.name]}</td> })}
                     </tr>
            })}
           </tbody>
  }

  render(){
      return <Table responsive>
                <thead>
                  {this.createHeader(this.props.columns)}
                </thead>
                {this.createRows()}
              </Table>;
  }
}
