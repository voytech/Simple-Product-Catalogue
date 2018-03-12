import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { DashboardView } from '../views/DashboardView';

export class Main extends React.Component {

  render(){
    return <Switch>
              <Route path="/dashboard" name="Dashboard" component={DashboardView}/>
              <Redirect from="/" to="/dashboard"/>
           </Switch>

  }
}
