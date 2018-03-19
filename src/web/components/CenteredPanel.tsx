import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';


interface ICenteredPanelProps {
    title:string;
}

export class CenteredPanel extends React.Component<ICenteredPanelProps,any>{

  constructor(props){
    super(props);
  }

  render(){
    return <div className="row">
              <Col sm={4} smOffset={4}
                   md={4} mdOffset={4}
                   lg={4} lgOffset={4} >
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h2">{this.props.title}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                     {this.props.children}
                 </Panel.Body>
               </Panel>
              </Col>
           </div>
  }
}
