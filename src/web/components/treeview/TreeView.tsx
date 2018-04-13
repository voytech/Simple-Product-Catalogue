import * as  React from 'react';
import { ListGroup, ListGroupItem, Row   } from 'react-bootstrap';

export interface TreeItem<T> {
  title  : string;
  details ?: T;
  childs : TreeItem<T> []
}

export interface TreeItemActions {
  editRow : () => void;
  removeRow : () => void;
}

export interface NoArgRender{
  () : React.ReactNode
}

export interface RenderTreeItem<T> {
   (treeItem : TreeItem<T>) : React.ReactNode;
}

export interface RenderByTitle<T> {
  [title : string] : RenderTreeItem<T>
}

export interface Roots<T> {
  data : TreeItem<T>[]
}


export type TreeViewProps<T> = Roots<T> &
                               RenderTreeItem<T> &
                               RenderByTitle<T> ;


interface TreeViewState<T> {
  data : TreeItem<T>[]
}



//----------------------------------------------------
export class TreeView<T> extends React.Component<TreeViewProps<T>,TreeViewState<T>>{

  constructor(props){
    super(props);
  }


  private renderNode = (treeItem : TreeItem<T>) => {
    return <ListGroup>
            <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
            <ListGroupItem header="Heading 2" href="#">
              Linked item
            </ListGroupItem>
            <ListGroupItem header="Heading 3" bsStyle="danger">
              Danger styling
            </ListGroupItem>
          </ListGroup>;
  }

  render(){
      return <Row>
                { this.props.data.map(e => this.renderNode(e)) }
             </Row>;
  }
}
