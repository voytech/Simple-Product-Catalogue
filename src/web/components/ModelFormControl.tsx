import * as  React from 'react';
import { FormControl  } from 'react-bootstrap';
import { FormEvent } from '../utils/FormUtils';


export interface IFormControlDef{
   parent : any;
   property : string;
   validators ?: ((value: any) => false | string)[]
}

export interface IFormControlState {
  value : any;
}


export class ModelFormControl extends React.Component<IFormControlDef,IFormControlState>{

  constructor(props){
    super(props);
  }

  updateModel(e: FormEvent){
    this.setState({value : e.currentTarget.value});
  }

  render(){
    return <FormControl {...this.props} value={this.state.value} ref={(input)=> this.props.parent.appendControl(input)} onChange={this.updateModel}></FormControl>
  }
}
