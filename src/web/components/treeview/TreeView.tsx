import * as  React from 'react';
import { ListGroup, ListGroupItem, Row, Col, Glyphicon  } from 'react-bootstrap';
import { v1 as uuid } from 'uuid';

export interface TreeItem<T> {
  id : string;
  title  : string;
  details ?: T;
  childs : TreeItem<T> []
}

export class TreeItemImpl<T> implements TreeItem<T> {
  id;
  constructor(public title,public childs){
    this.id = uuid()
  }
}

export interface TreeItemActions {
  editRow : () => void;
  removeRow : () => void;
}

export interface NoArgRender{
  () : React.ReactNode
}

export interface ExpanderClickCallback<T> {
  (item : TreeItem<T>) : void
}

export interface RenderTreeItem<T> {
   (treeItem : TreeItem<T>) : React.ReactNode;
}

export interface RenderContent<T> {
    (item : TreeItem<T>) : React.ReactNode;
}

export interface RenderByTitle<T> {
  [title : string] : RenderTreeItem<T>
}

export interface Roots<T> {
  data : TreeItem<T>[]
}

export type TreeViewProps<T> = Roots<T> &
                               {renderNode ?: RenderTreeItem<T>,
                                renderContent ?: RenderContent<T>} ;

interface TreeItemState<T> {
  expanded : boolean
  isLeaf : boolean
}

interface TreeItemsState<T> {
  [title : string] : TreeItemState<T>
}

interface TreeViewState<T> {
  nodes : TreeItemsState<T>
}

//----------------------------------------------------
export class TreeView<T> extends React.Component<TreeViewProps<T>,TreeViewState<T>>{

  constructor(props){
    super(props);
    this.state = {nodes : {}}
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

  private identLevel = (level) => {
    return  {
      marginLeft : (level * 30)
    }
  }

  private itemState = (item : TreeItem<T>) => {
    if (this.state && this.state.nodes){
      if (!this.state.nodes[item.id]){
        this.setState({nodes: {...this.state.nodes,[item.id] :  {expanded : false, isLeaf : item.childs.length == 0}}})
      }
    }
    return this.state.nodes[item.id]
  }

  private expanded = (item : TreeItem<T>) => {
    let state = this.itemState(item)
    return (state && (state.expanded == true && !state.isLeaf)) === true
  }

  private renderExpander = (item : TreeItem<T>) =>{
    let state = this.itemState(item)
    if (state && state.isLeaf == true)
      return <Glyphicon glyph="stop" />
    else {
      return <Glyphicon glyph={this.expanded(item) == true ? "minus" : "plus"} />
    }
  }

  private renderContent = (item : TreeItem<T>) => {
    return this.props.renderContent ? this.props.renderContent(item) : item.title;
  }

  private expanderCallback = (item : TreeItem<T>, nextCallback ?: ExpanderClickCallback<T>) => {
    if (this.state && this.state.nodes){
      let current = this.state.nodes[item.id] || {expanded : false, isLeaf : item.childs.length == 0}
      current.expanded =! current.expanded;
      this.setState({nodes: {...this.state.nodes,[item.id] : current}})
    }
    if (nextCallback) nextCallback(item)
  }

  private buildNode = (item : TreeItem<T>,level :number,callback : ExpanderClickCallback<T>) => {
    return [<ListGroupItem>
             <div style={this.identLevel(level)}>
                <Row>
                  <div className='pull-left' style={{marginRight:15}}>
                    <a onClick={() => callback(item)}>{this.renderExpander(item)}</a>
                  </div>
                  <div>
                    {this.renderContent(item)}
                  </div>
                </Row>
             </div>
           </ListGroupItem>].concat(this.expanded(item) == true ? this.buildNodes(item.childs,++level,callback) : [])
  }

  private buildNodes = (data : TreeItem<T>[],level:number,callback : ExpanderClickCallback<T>) => {
      return this.flatten(data.map(i => this.buildNode(i,level,callback)),[])
  }

  render(){
      return <ListGroup>
                { this.buildNodes(this.props.data,1,this.expanderCallback) }
             </ListGroup>;
  }
}
