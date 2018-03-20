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
}

export class VFormGroup extends React.Component<IFormGroupProperties>{

  constructor(props){
    super(props);
  }

  render(){
    let {display, errors, children, ...rest} = this.props;
    return <FormGroup key={this.props.name}>
               <ControlLabel>{this.props.display}</ControlLabel>
               {children !== undefined ? children : <FormControl {... rest} />}
               {errors && <HelpBlock>{errors}</HelpBlock> }
            </FormGroup>
  }
}
