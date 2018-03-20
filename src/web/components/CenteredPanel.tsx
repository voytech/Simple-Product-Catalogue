import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';


interface ICenteredPanelProps {
    title?:string;
    headerClass?:string;
    sm?:number;
    md?:number;
    lg?:number;
}

export class CenteredPanel extends React.Component<ICenteredPanelProps,any>{

  constructor(props){
    super(props);
  }

  renderHeading = () => {
    return this.props.title ?
              <Panel.Heading>
                <Panel.Title componentClass={this.props.headerClass || "h2"}>{this.props.title}</Panel.Title>
              </Panel.Heading>
              :
              undefined;
  }

  sm = () => {
    return this.props.sm || 4;
  }

  md = () => {
    return this.props.md || 4;
  }

  lg = () => {
    return this.props.lg || 4;
  }

  calcOffset = (size : number) => {
    return (12 - size) / 2;
  }

  render(){
    return <div className="row">
              <Col sm={this.sm()} smOffset={this.calcOffset(this.sm())}
                   md={this.md()} mdOffset={this.calcOffset(this.md())}
                   lg={this.lg()} lgOffset={this.calcOffset(this.lg())}>
                <Panel>
                  {this.renderHeading()}
                  <Panel.Body>
                     {this.props.children}
                 </Panel.Body>
               </Panel>
              </Col>
           </div>
  }
}
