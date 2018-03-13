global['jQuery'] = require('jquery');
import 'bootstrap';
const Style = require('bootstrap/dist/css/bootstrap.css');
import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from './routers/Main'
import { User } from './routers/User'
import { Link, Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { HeaderComponent } from './components/HeaderComponent'
//
class App extends React.Component{
  render(){
    return <div className="container-fluid">
               <HeaderComponent title='Simple Product Catalogue'></HeaderComponent>
               <HashRouter>
                 <Switch>
                   <Route path="/user" name="User" component={User}/>
                   <Route path="/" name="Home" component={Main}/>
                 </Switch>
               </HashRouter>
          </div>;
  }
}
ReactDOM.render(<App />,document.getElementById("container"));
