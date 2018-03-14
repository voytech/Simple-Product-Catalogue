import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';

interface IState{
    userName:string;
    userPassword:string;
}

export class LoginView extends React.Component<any,IState>{

  constructor(props){
    super(props);
    this.state =  {userName:'',userPassword:''};
  }

  private setUserName = (e : FormEvent) => {
    this.setState({userName: e.currentTarget.value})
  }

  private setUserPassword = (e : FormEvent) => {
    this.setState({userPassword: e.currentTarget.value})
  }

  render(){
    return <div className="row">
              <Col sm={4} smOffset={4}
                   md={4} mdOffset={4}
                   lg={4} lgOffset={4} >
                <form>
                 <FormGroup>
                    <ControlLabel>Enter Login</ControlLabel>
                    <FormControl type="text" value={this.state.userName} onChange={this.setUserName}></FormControl>
                 </FormGroup>
                 <FormGroup>
                    <ControlLabel>Enter Password</ControlLabel>
                    <FormControl type="text" value={this.state.userPassword} onChange={this.setUserPassword}></FormControl>
                 </FormGroup>
               </form>
              </Col>
           </div>
  }
}
