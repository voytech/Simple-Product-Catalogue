import * as  React from 'react';
import { Link, Switch, Redirect, RouteProps } from 'react-router-dom';
import { GuardedRoute } from './GuardedRoute'
import { store, StoreUtils } from '../Store'

export class AuthRoute extends React.Component<RouteProps> {

  constructor(props){
    super(props);
  }

  private check = () => {
    return StoreUtils.isAuthenticated();
  }

  render(){
      return <GuardedRoute check={this.check} loginPath={'/user/login'} {...this.props} />
  }
}
