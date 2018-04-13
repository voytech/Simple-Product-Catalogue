import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { CategoriesView } from '../views/categories/CategoriesView';


export class CategoryRoutes extends React.Component<any> {

  constructor(props){
    super(props);
  }

  private path(name :string){
    return this.props.match.url + name;
  }

  render(){
    return <Switch>
              <Route path={this.path("/tree")} component={CategoriesView}/>
              <Redirect from={this.path("/")} to={this.path("/tree")}/>
           </Switch>

  }
}
