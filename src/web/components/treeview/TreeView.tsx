import * as  React from 'react';
import { ListGroup, ListGroupItem, Row, Glyphicon  } from 'react-bootstrap';

export interface TreeItem<T> {
  title  : string;
  details ?: T;
  childs : TreeItem<T> []
}

export class TreeItemImpl<T> implements TreeItem<T> {
  constructor(public title,public childs){}
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
                               {renderNode ?: RenderTreeItem<T>} ;


interface TreeViewState<T> {
  data : TreeItem<T>[]
}



//----------------------------------------------------
export class TreeView<T> extends React.Component<TreeViewProps<T>,TreeViewState<T>>{

  constructor(props){
    super(props);
  }



  iterate = (roots) => {
     return null;
  }

  private flatten = (arr, result = []) => {
    for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i];
      if (Array.isArray(value)) {
        this.flatten(value, result);
      } else {
        result.push(value);
      }
    }
    return result;
  }

  renderTree(){
    return <ListGroup>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 1',true,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(2,'child 1',true,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(3,'child  1 1',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(3,'child  1 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(2,'child 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 3',false,null)}</ListGroupItem>
          </ListGroup>
  }

  private identLevel = (level) => {
    return  {
      marginLeft : (level*30)
    }
  }


  private treeNode = (level,title,toggle,renderContent) => {
    return
  }

  private expanded = (item : TreeItem<T>) => {
    return false;
  }

  private buildNode = (item : TreeItem<T>,level :number) => {
    return [<ListGroupItem  href="#" >
             <div style={this.identLevel(level)}>
                <Row>
                  <div className='pull-left' style={{marginRight:15}}>
                    <a><Glyphicon glyph={this.expanded(item) == false ? "triangle-bottom" : "triangle-top"} /></a></div>
                  <div className='pull-left'>{item.title}</div>
                </Row>
             </div>
           </ListGroupItem>,
           (this.buildNodes(item.childs,++level))]
  }

  private buildNodes = (data : TreeItem<T>[],level:number) => {
      return this.flatten(data.map(i => this.buildNode(i,level)),[])
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
      return <ListGroup>
                { this.buildNodes(this.props.data,0) }
             </ListGroup>;
  }
}
