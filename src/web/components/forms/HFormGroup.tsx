import * as  React from 'react';
import { FormGroup,
         FormControl,
         HelpBlock,
         ControlLabel,
         Col, Panel,
         Button,
         ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';

export interface IFormGroupProperties{
   name : string;
   display : string;
   type : string;
   value?: string;
   errors?: string;
   componentClass ?:string;
   onChange?: Function;
   labelWidth ?: number;
   controlWidth ?: number;
}

export class HFormGroup extends React.Component<IFormGroupProperties>{

  constructor(props){
    super(props);
  }

  getValidationState = () => {
    return this.props.errors ? 'error' : null;
  }

  render(){
    let {display, errors, children, labelWidth, controlWidth, ...rest} = this.props;
    return <FormGroup key={this.props.name} validationState={this.getValidationState()}>
              <Col componentClass={ControlLabel} sm={labelWidth || 2}>
                {this.props.display}
              </Col>
              <Col sm={controlWidth || 10}>
                {children !== undefined ? children : <FormControl {... rest} />}
                {errors && <HelpBlock>{errors}</HelpBlock> }
              </Col>
          </FormGroup>
  }
}
