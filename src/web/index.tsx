import 'bootstrap';
const Style = require('bootstrap/dist/css/bootstrap.css');
import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import { Main } from './routers/Main'
import { User } from './routers/User'
import { Link, Switch, Route, Redirect, HashRouter } from 'react-router-dom';

class App extends React.Component{
  render(){
    return <div>
             <h2>Simple Product Catalogue</h2>
             <Container>
               <HashRouter>
                 <Switch>
                   <Route path="/user" name="User" component={User}/>
                   <Route path="/" name="Home" component={Main}/>
                 </Switch>
               </HashRouter>
             </Container>
          </div>;
  }
}
ReactDOM.render(<App />,document.getElementById("container"));
