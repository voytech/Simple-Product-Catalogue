import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { store } from '../../Store';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';
import { FormComponent, IFieldData, IFormData, fields } from '../../components/FormComponent';
import { CenteredPanel } from '../../components/CenteredPanel';
import { emailValidation, emptyValidation } from '../../components/FormValidators';
import { loginAction } from '../../actions/user/LoginAction';

interface ILoginState{
    email:string;
    passwd:string;
}

interface IFormLoginProps {
   email : string;
   passwd : string;
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
    }
  }


  private login = (email:string, passwd:string) => {
    this.props.doLogin(email,passwd);
  }

  private renderForm(){
    return  <Formik
              initialValues={{ email: '', passwd: ''}}
              validate={values => {}}
              onSubmit={(values: IFormLoginProps) => this.login(values.email,values.passwd)}
              render={(props : FormikProps<IFormLoginProps>) => (
                <Form onSubmit={props.handleSubmit}>
                  <Field
                    name="email"
                    render = { (fieldProps : FieldProps<IFormLoginProps>) => {
                        return <VFormGroup field='email' display='Email' value={props.values.email} type='text' onChange={props.handleChange}/>}
                    }
                  />
                  <Field
                    name="passwd"
                    render = { (fieldProps : FieldProps<IFormLoginProps>) => {
                        return <VFormGroup field='passwd' display='Password' value={props.values.passwd} type='password' onChange={props.handleChange}/>}
                    }
                  />
                  <ButtonToolbar>
                    <Button bsStyle="primary" type="submit" >Login</Button>
                    <Button href="#/user/register" type="submit">Sign In</Button>
                  </ButtonToolbar>
                </Form>
              )}
            />
  }

  render(){
    return <CenteredPanel title='Please Login'>
              {this.renderForm()}
           </CenteredPanel>
  }
}
/*
<FormComponent
  definition={fields(new Field('userEmail','User Email','text','',[emailValidation,
                                                                   emptyValidation]),
                     new Field('userPassword','Enter Password','password','',[emptyValidation]))}
  onChange={this.onChange} />
*/
const mapStateToProps = (state) => {
  return ({...state.global.auth});
};

const mapDispatchToProps = (dispatch) => ({
  doLogin : (email: string, password: string) => {
    dispatch(loginAction(email,password));
  }
});

export const LoginView = connect(mapStateToProps, mapDispatchToProps)(_LoginView_);
