import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { connect } from 'react-redux';

import { FormGroup, FormControl, ControlLabel, Col, Panel, Button, ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../../utils/FormUtils';
import { CenteredPanel } from '../../components/CenteredPanel';
import { registerAction } from '../../actions/user/RegisterAction';
import yup from 'yup';

interface IFormRegisterProps{
    name: string;
    password: string;
    email: string;
}

interface IRegisterViewProps{
  doRegister: (obj : IFormRegisterProps) => void;
}

export class _RegisterView_ extends React.Component<IRegisterViewProps>{

  constructor(props){
    super(props);
  }


  private doRegister = (obj : IFormRegisterProps) => {
     this.props.doRegister(obj);
  }

  private renderForm(){
    return  <Formik
              initialValues={{ name: '', password: '', email:''}}
              validationSchema={ yup.object().shape({
                name:  yup.string().required().min(5).max(25),
                email: yup.string().email().required(),
                password: yup.string().required().min(8)
                             .matches(/[A-Z]/,'Password must contain uppercase letters')
                             .matches(/[0-9]/,'Password must contain numbers')
                             .matches(/\W/,'Password must contain non alphanumeric characters')
              })}
              onSubmit={(values: IFormRegisterProps) => this.doRegister(values)}
              render={(props : FormikProps<IFormRegisterProps>) => (
                <Form onSubmit={props.handleSubmit}>
                  <VFormGroup name='name'
                              display='Name'
                              value={props.values.name}
                              type='text'
                              onChange={props.handleChange}
                              errors={props.touched.name && props.errors.name} />
                  <VFormGroup name='email'
                              display='Email'
                              value={props.values.email}
                              type='text'
                              onChange={props.handleChange}
                              errors={props.touched.email && props.errors.email} />
                  <VFormGroup name='password'
                              display='Password'
                              value={props.values.password}
                              type='password'
                              onChange={props.handleChange}
                              errors={props.touched.password && props.errors.password} />
                  <ButtonToolbar>
                    <Button bsStyle="primary" type="submit" >Register</Button>
                    <Button href="#/user/login" type="submit">Log In</Button>
                  </ButtonToolbar>
                </Form>
              )}
            />
  }
  render(){
    return <CenteredPanel title='Please Register'>
              {this.renderForm()}
            </CenteredPanel>
  }
}

const mapStateToProps = (state) => ({
  ...state.auth
});

const mapDispatchToProps = () => ({
  doRegister : (obj: IFormRegisterProps) => {
    registerAction(obj.name, obj.email, obj.password);
  }
});

export const RegisterView = connect(mapStateToProps, mapDispatchToProps)(_RegisterView_);
