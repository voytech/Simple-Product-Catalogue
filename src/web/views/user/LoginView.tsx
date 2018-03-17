import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';
import { FormComponent, IFieldData, IFormData, Field, fields } from '../../components/FormComponent';
import { CenteredPanel } from '../../components/CenteredPanel';
import { emailValidation, emptyValidation } from '../../components/FormValidators';

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
  this.setState(formData);
}


  private login = () => {
    fetch("v1/user/auth/login",{
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => this.props.history.push('/')
     ).catch(error => console.error(error));
  }

  render(){
    return <CenteredPanel title='Please Login'>
              <FormComponent
                definition={fields(new Field('userEmail','User Email','text','',[emailValidation,
                                                                                 emptyValidation]),
                                   new Field('userPassword','Enter Password','password','',[emptyValidation]))}
                onChange={this.onChange} />
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" onClick={this.login}>Login</Button>
                <Button href="#/user/register" type="submit">Sign In</Button>
              </ButtonToolbar>
           </CenteredPanel>
  }
}
