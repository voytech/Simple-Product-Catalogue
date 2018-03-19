import * as  React from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { store, StoreUtils } from '../Store'
import { CenteredPanel } from '../components/CenteredPanel'

export class DashboardView extends React.Component{
  render(){
    return <Jumbotron>
              <h2>Welcome <b>{StoreUtils.isAuthenticated() === false ? 'Stranger' : StoreUtils.currentUser()}</b> !</h2>
              { (StoreUtils.isAuthenticated() == false) ?
                  <CenteredPanel title='You are not authorized !'>
                    <p><span>Not stranger at all ? <b><a href='#/user/login'>Login</a></b></span></p>
                    <p><span>Do not have an account ? <b><a href='#/user/register'>Sign In</a></b></span></p>
                  </CenteredPanel>
                  :
                  <CenteredPanel title='What next?'>
                    <p><b><a href='#/products/list'>See your catalog.</a></b></p>
                    <p><b><a href='#/pricelists/list'>See your price lists.</a></b></p>
                  </CenteredPanel>
              }
           </Jumbotron>;
  }
}
