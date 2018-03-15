import * as  React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormComponent, IFieldData, IFormData, Field, fields } from '../../components/FormComponent';
import { FormEvent } from '../../utils/FormUtils';
import { CenteredPanel } from '../../components/CenteredPanel';


interface IRegisterState{
    name: string;
    password: string;
    email: string;
}

export class RegisterView extends React.Component<any,IRegisterState>{

  constructor(props){
    super(props);
    this.state =  {
      name:'',
      password:'',
      email:''
    };
  }

  private onChange = (field : IFieldData, form : IFormData) => {
    let formData = {
      email: FormComponent.getValue(form,'userEmail'),
      name : FormComponent.getValue(form,'userName'),
      password : FormComponent.getValue(form,'userPassword')
    };
    console.info(formData);
    this.setState(formData);
  }

  private register = () => {
    fetch("v1/user/auth/register",{
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      console.info(response.json);
    });
  }

  render(){
    return <CenteredPanel title='Please Register'>
              <FormComponent
                definition={fields(new Field('userName','Enter User Name','text',''),
                                   new Field('userPassword','Enter Password','password',''),
                                   new Field('userEmail','Enter User Email','text',''))}
                onChange={this.onChange} />
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" onClick={this.register}>Sign In</Button>
                <Button href="#/user/login" type="submit">Login</Button>
              </ButtonToolbar>
            </CenteredPanel>
  }
}
