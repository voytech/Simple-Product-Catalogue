import * as  React from 'react';
import { Panel, Button, Glyphicon, Tabs, Tab  } from 'react-bootstrap';
import { EditorStep } from './EditorStep'

interface IEditorProps {
  title : string;
  createText ?: string;
 }

interface IEditorState{
  open : boolean;
}

export class EditorComponent extends React.Component<IEditorProps,IEditorState>{

  constructor(props){
    super(props);
    this.state = {open : false};
  }


  render(){
      return <Panel onToggle={()=>{}} expanded={this.state.open}>
                <Panel.Heading>
                  <Button bsStyle="primary" onClick={() => this.setState({ open: !this.state.open })}>
                      <Glyphicon glyph="plus-sign" /> {this.props.createText || 'Create New'}
                  </Button>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                      <Tabs id='editor-component-steps'>
                        {React.Children.map(this.props.children,(child, idx) => {
                            return <Tab title={(child as any).props.title} eventKey={(child as any).props.step}>{child}</Tab>})
                        }
                      </Tabs>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
  }
}
