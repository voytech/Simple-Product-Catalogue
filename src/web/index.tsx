global['jQuery'] = require('jquery');
import 'bootstrap';
const Style = require('bootstrap/dist/css/bootstrap.css');
const AppStyle = require('./styles/app.css');

import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { MainRoutes } from './routers/MainRoutes'
import { UserRoutes } from './routers/UserRoutes'
import { ProductRoutes } from './routers/ProductRoutes'

import { Link, Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { HeaderComponent } from './components/HeaderComponent'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './Store'
//
class App extends React.Component{
  render(){
    return <Provider store={store}>
              <HashRouter>
                 <div className="container-fluid">
                     <HeaderComponent title='Simple Product Catalogue'></HeaderComponent>
                     <Switch>
                       <Route path="/user"  component={UserRoutes}/>
                       <Route path="/products"  component={ProductRoutes}/>
                       <Route path="/"  component={MainRoutes}/>
                     </Switch>
                 </div>
              </HashRouter>
           </Provider>;
  }
}
ReactDOM.render(<App />,document.getElementById("container"));
