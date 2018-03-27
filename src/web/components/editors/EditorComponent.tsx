import * as  React from 'react';
import { Panel, Button, Glyphicon, Tabs, Tab  } from 'react-bootstrap';
import { EditorStep } from './EditorStep'

interface RenderHeader {
  (props : EditorHeadingProps) : React.ReactNode;
}

interface IEditorProps {
  title ?: string;
  withHeading  ?: boolean;
  toggleText   ?: string;
  renderHeader ?: RenderHeader;
}

interface EditorHeadingProps {
  toggle : () => void;
}

interface IEditorState{
  open : boolean;
}

export class EditorComponent extends React.Component<IEditorProps,IEditorState>{

  constructor(props){
    super(props);
    this.state = {open : false};
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  headerProps = () => {
      return  {
        toggle : this.toggle
      }
  }

  getDefaultHeaderRender = (toggleText : string) => {
    return (props : EditorHeadingProps = { toggle : this.toggle }) => {
          return <Panel.Heading>
                    <Button bsStyle="primary" onClick={() => props.toggle() }>
                        <Glyphicon glyph="plus-sign" /> {toggleText}
                    </Button>
                  </Panel.Heading>
    }
  }

  render(){
      return <Panel onToggle={()=>{}} expanded={this.props.withHeading == true ? this.state.open : true}>
                {this.props.withHeading && (this.props.renderHeader ? this.props.renderHeader(this.headerProps())
                                                                    : this.getDefaultHeaderRender(this.props.toggleText)())}
                <Panel.Collapse>
                    <Panel.Body>
                      { this.props.children && React.Children.count(this.props.children) > 1 ?
                        <Tabs id='editor-component-steps'>
                          {React.Children.map(this.props.children,(child, idx) => {
                              return <Tab key={idx} title={(child as any).props.title} eventKey={(child as any).props.step}>{child}</Tab>})}
                        </Tabs>
                        :
                        this.props.children
                      }
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
  }
}
