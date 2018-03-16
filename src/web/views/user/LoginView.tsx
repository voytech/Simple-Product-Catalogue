import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';
import { FormComponent, IFieldData, IFormData, Field, fields } from '../../components/FormComponent';
import { CenteredPanel } from '../../components/CenteredPanel';

interface ILoginState{
    email:string;
    passwd:string;
}

export class LoginView extends React.Component<any,ILoginState>{

  constructor(props){
    super(props);
    this.state =  {email:'', passwd:''};
  }

private onChange = (field : IFieldData, form : IFormData) => {
  let formData = {
    email: FormComponent.getValue(form,'userEmail'),
    passwd : FormComponent.getValue(form,'userPassword'),
  };
  console.info(formData);
  this.setState(formData);
}


  private login = () => {
    fetch("v1/user/auth/login",{
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => console.info("Works ?")
     ).catch(error => console.error(error));
  }

  private emailValidate = (input : string) => {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(input) ? false : 'Email is invalid';
  }

  render(){
    return <CenteredPanel title='Please Login'>
              <FormComponent
                definition={fields(new Field('userEmail','User Email','text','',[this.emailValidate]),
                                   new Field('userPassword','Enter Password','password',''))}
                onChange={this.onChange} />
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" onClick={this.login}>Login</Button>
                <Button href="#/user/register" type="submit">Sign In</Button>
              </ButtonToolbar>
           </CenteredPanel>
  }
}
