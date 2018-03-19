import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { AuthRoute } from '../components/AuthRoute';
import { CreateProductView } from '../views/products/CreateProductView';
import { ProductListView } from '../views/products/ProductListView';

export class User extends React.Component<RouteComponentProps<any>> {

  constructor(props){
    super(props);
  }

  private path(name :string){
    return this.props.match.url + name;
  }

  render(){
     return <Switch>
              <AuthRoute path={this.path("/create")}   component={CreateProductView}/>
              <AuthRoute path={this.path("/products")} component={ProductListView}/>
              <Redirect from={this.path("/")} to={this.path("/browse")}/>
            </Switch>
  }
}
