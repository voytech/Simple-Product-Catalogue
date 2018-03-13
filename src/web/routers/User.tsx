import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { LoginView } from '../views/user/LoginView';
import { RegisterView } from '../views/user/RegisterView';
import { ProfileView } from '../views/user/ProfileView';

export class User extends React.Component<RouteComponentProps<any>> {

  constructor(props){
    super(props);
  }

  private path(name :string){
    return this.props.match.url + name;
  }

  render(){
     return <Switch>
              <Route path={this.path("/register")} name="Register" component={RegisterView}/>
              <Route path={this.path("/login")} name="Login" component={LoginView}/>
              <Route path={this.path("/profile")} name="Profile" component={ProfileView}/>
              <Redirect from={this.path("/")} to={this.path("/login")}/>
            </Switch>
  }
}
