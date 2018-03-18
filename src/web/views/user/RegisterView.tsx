import * as  React from 'react';
import { connect } from 'react-redux';

import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormComponent, IFieldData, IFormData, Field, fields } from '../../components/FormComponent';
import { FormEvent } from '../../utils/FormUtils';
import { CenteredPanel } from '../../components/CenteredPanel';
import { emailValidation, emptyValidation } from '../../components/FormValidators';
import { registerAction } from '../../actions/user/RegisterAction';

interface IRegisterState{
    name: string;
    password: string;
    email: string;
}

export class _RegisterView_ extends React.Component<any,IRegisterState>{

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
    this.setState(formData);
  }

  private doRegister = () => {
     this.props.doRegister(
       this.state.name,
       this.state.email,
       this.state.password
     );
  }

  render(){
    return <CenteredPanel title='Please Register'>
              <FormComponent
                definition={fields(new Field('userName','User Name','text','',[emptyValidation]),
                                   new Field('userEmail','User Email','text','',[emailValidation,emptyValidation]),
                                   new Field('userPassword','Password','password','',[emptyValidation]))}
                onChange={this.onChange} />
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit" onClick={this.doRegister}>Sign In</Button>
                <Button href="#/user/login" type="submit">Login</Button>
              </ButtonToolbar>
            </CenteredPanel>
  }
}

const mapStateToProps = (state) => ({
  ...state.auth
});

const mapDispatchToProps = (dispatch) => ({
  doRegister : (name:string, email: string, password: string) => {
    dispatch(registerAction(name,email,password));
  }
});

export const RegisterView = connect(mapStateToProps, mapDispatchToProps)(_RegisterView_);
