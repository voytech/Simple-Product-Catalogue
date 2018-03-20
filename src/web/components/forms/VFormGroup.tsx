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
   field : string;
   display : string;
   type : string;
   value?: string;
   errors?: string;
   onChange?: Function;
}

export class VFormGroup extends React.Component<IFormGroupProperties>{

  constructor(props){
    super(props);
  }

  render(){
    return <FormGroup key={this.props.field}>
               <ControlLabel>{this.props.display}</ControlLabel>
               {this.props.children !== undefined ?
                 this.props.children
                 :
                 <FormControl name={this.props.field} type={this.props.type} value={this.props.value} onChange={this.props.onChange}></FormControl>
               }
               {(this.props.errors !== undefined && this.props.errors.length > 0) ?
                 <HelpBlock>{this.props.errors}</HelpBlock> : undefined}
            </FormGroup>
  }
}
