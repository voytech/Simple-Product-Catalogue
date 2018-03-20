import * as  React from 'react';
import { Table   } from 'react-bootstrap';

interface IListViewProps {
  columns : string [];
  rows : object [];
  select ?: Function;
  fetch ?: Function;
}

export class ListViewComponent extends React.Component<IListViewProps>{

  constructor(props){
    super(props);
  }

  createHeader(columns : string[]){
    return <tr>
            {columns.map(col=> <th>{col}</th>)}
           </tr>
  }

  createRows(){
    return <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
  }

  render(){
      return <Table responsive>
                <thead>
                  {this.createHeader(this.props.columns)}
                </thead>
                <tbody>
                  {this.createRows()}
                </tbody>
              </Table>;
  }
}
