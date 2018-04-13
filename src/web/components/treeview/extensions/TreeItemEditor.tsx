import * as  React from 'react';
import { Button, ButtonGroup, Row, Col, Glyphicon } from 'react-bootstrap';
import {TreeItem, TreeItemImpl, TreeViewProps, Roots} from '../TreeView'


export interface ItemEditorTreeViewProps<T>{
  newItem : () => void
  delete: () => void
}

export function withItemEditor<T>(passProps ?: TreeViewProps<T>){
  return (Component) => {
    let EXT = class extends React.Component<Roots<T>> {

        constructor(props){
          super(props)
        }


        renderContent = (item : TreeItem<T>) => {
          return <div>
                  <b>{item.title}</b>
                  <ButtonGroup bsSize="xsmall" className="pull-right">
                      <Button bsStyle="primary"> <Glyphicon glyph="pencil" /></Button>
                      <Button bsStyle="success"> <Glyphicon glyph="plus-sign" /></Button>
                      <Button bsStyle="danger"> <Glyphicon glyph="minus-sign" /></Button>
                  </ButtonGroup>
                </div>
        }


        render(){
          return <Component {...this.props} renderContent={this.renderContent} />
        }
    }
    return class extends React.Component<Roots<T>> {

      constructor(props){
        super(props)
      }

      render(){
        return <EXT {...this.props} {...passProps} />
      }
    }
  }
}
