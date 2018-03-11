import 'bootstrap';
const Style = require('bootstrap/dist/css/bootstrap.css');
import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Main } from './Main'
import { LoginComponent } from './LoginComponent'

ReactDOM.render(
  <Main>
    <LoginComponent>
    </LoginComponent>
  </Main>,document.getElementById("container"));
