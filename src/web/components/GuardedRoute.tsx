import * as  React from 'react';
import { Link, Switch, Route, Redirect, RouteProps } from 'react-router-dom';

interface IGueardedRouterState extends RouteProps {
  check : () => void;
  loginPath : string;
}

export class GuardedRoute extends React.Component<IGueardedRouterState> {

  constructor(props){
    super(props);
  }

  render(){
      let { check, loginPath, component : Component, ...rest } = this.props;
      let render = (props) => {}
      return <Route
                {... rest}
                render={(props) => {
                   check() ? <Component {...props}/> :
                             <Redirect to={{
                                          pathname: loginPath,
                                          state: { from: props.location }
                                        }}/>
                }} />
  }
}
