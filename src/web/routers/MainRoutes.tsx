import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { DashboardView } from '../views/DashboardView';


export class MainRoutes extends React.Component<any> {

  render(){
    return <Switch>
              <Route path="/dashboard" component={DashboardView}/>
              <Redirect from="/" to="/dashboard"/>
           </Switch>

  }
}
