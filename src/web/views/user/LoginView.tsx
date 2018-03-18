import * as  React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { store } from '../../Store';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';
import { FormComponent, IFieldData, IFormData, Field, fields } from '../../components/FormComponent';
import { CenteredPanel } from '../../components/CenteredPanel';
import { emailValidation, emptyValidation } from '../../components/FormValidators';
import { loginAction } from '../../actions/user/LoginAction';

interface ILoginState{
    email:string;
    passwd:string;
}

interface ILoginProps {
    token: string;
    history : string[];
    doLogin : (email:string, password:string) => void;
}

class _LoginView_ extends React.Component<ILoginProps,ILoginState>{

  constructor(props){
    super(props);
    this.state =  {email:'', passwd:''};
  }

  componentWillReceiveProps(props) {
    if (props.token) {
      console.info('User Logged In, Redirecting to dashboard...');
      this.props.history.push('/')
      //store.dispatch(push('/'));
    }
  }

  private onChange = (field : IFieldData, form : IFormData) => {
    let formData = {
      email: FormComponent.getValue(form,'userEmail'),
      passwd : FormComponent.getValue(form,'userPassword'),
    };
    this.setState(formData);
  }

  private login = () => {
    this.props.doLogin(this.state.email,this.state.passwd);
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

const mapStateToProps = (state) => {
  return ({...state.global.auth});
};

const mapDispatchToProps = (dispatch) => ({
  doLogin : (email: string, password: string) => {
    dispatch(loginAction(email,password));
  }
});

export const LoginView = connect(mapStateToProps, mapDispatchToProps)(_LoginView_);
