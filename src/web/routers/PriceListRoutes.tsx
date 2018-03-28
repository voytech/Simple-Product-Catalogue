import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { AuthRoute } from '../components/AuthRoute';
import { PriceListsView } from '../views/pricelists/PriceListsView';

export class PriceListRoutes extends React.Component<RouteComponentProps<any>> {

  constructor(props){
    super(props);
  }

  private path(name :string){
    return this.props.match.url + name;
  }

  render(){
     return <Switch>
              <AuthRoute path={this.path("/list")} component={PriceListsView}/>
              <Redirect from={this.path("/")} to={this.path("/list")}/>
            </Switch>
  }
}
