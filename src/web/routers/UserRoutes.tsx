import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { LoginView } from '../views/user/LoginView';
import { AuthRoute } from '../components/AuthRoute';
import { RegisterView } from '../views/user/RegisterView';
import { ProfileView } from '../views/user/ProfileView';

export class UserRoutes extends React.Component<RouteComponentProps<any>> {

  constructor(props){
    super(props);
  }

  private path(name :string){
    return this.props.match.url + name;
  }

  render(){
     return <Switch>
              <Route path={this.path("/register")} component={RegisterView}/>
              <Route path={this.path("/login")} component={LoginView}/>
              <AuthRoute path={this.path("/profile")} component={ProfileView}/>
              <Redirect from={this.path("/")} to={this.path("/login")}/>
            </Switch>
  }
}
