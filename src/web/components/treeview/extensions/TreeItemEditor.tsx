import * as  React from 'react';
import { Button, Popover, ButtonGroup,InputGroup,OverlayTrigger, Row, Col, Glyphicon, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import {TreeItem, TreeItemImpl, TreeViewProps, Roots} from '../TreeView'
import { Formik, Form, FormikProps  } from 'formik';


export interface ItemEditorTreeViewProps<T> extends TreeViewProps<T>{
  newItem : (item : TreeItemBasicDetails,parentItem : TreeItem<T>) => void
  delete: (item : TreeItem<T>) => void
  edit: (item : TreeItem<T>) => void
}

export interface TreeItemBasicDetails {
  name : string,
  description : string
}

interface TreeState<T>  {
  [id : string] : boolean
}

export function withItemEditor<T>(passProps ?: ItemEditorTreeViewProps<T>){
  return (Component) => {
    let EXT = class extends React.Component<ItemEditorTreeViewProps<T>> {

        constructor(props){
          super(props)
          this.state = {}
        }

        toggleInputs = (item : TreeItem<T>) => {
          this.setState({...this.state,[item.id] : !this.state[item.id]})
        }

        editing = (item : TreeItem<T>) => {
          return <Popover id="creating-category" title="Create New...">
                    <Formik
                        initialValues={ { } }
                        onSubmit={(values: TreeItemBasicDetails) => this.props.newItem(values,item)}
                        render={(props : FormikProps<TreeItemBasicDetails>) => (
                           <Form className="form-inline mb-1">
                              <FormGroup className="ml-1" bsSize="small">
                                <FormControl name='name' type='text'
                                             value={props.values.name}
                                             onChange={props.handleChange}>
                                </FormControl>
                              </FormGroup>
                              <Button className="ml-1" bsStyle="primary" type="submit" bsSize="xsmall">
                                <Glyphicon glyph='save'/>
                              </Button>
                          </Form>
                      )}/>
                 </Popover>
        }

        renderContent = (item : TreeItem<T>) => {
          return <>
                  <b>{item.title}</b>
                  <ButtonGroup bsSize="xsmall" className="pull-right">
                      <Button onClick={() => this.props.edit(item)} bsStyle="primary">
                        <Glyphicon glyph="pencil" />
                      </Button>
                      <OverlayTrigger trigger="click" rootClose placement="right" overlay={this.editing(item)}>
                        <Button onClick={() => this.toggleInputs(item)} bsStyle="success">
                          <Glyphicon glyph="plus-sign" />
                        </Button>
                      </OverlayTrigger>
                      <Button onClick={() => this.props.delete(item)} bsStyle="danger">
                        <Glyphicon glyph="minus-sign" />
                      </Button>
                  </ButtonGroup>
                </>
        }


        render(){
          return <Component {...this.props} renderContent={this.renderContent} />
        }
    }
    return class extends React.Component<ItemEditorTreeViewProps<T>> {

      constructor(props){
        super(props)
      }

      render(){
        return <EXT {...this.props} {...passProps} />
      }
    }
  }
}
