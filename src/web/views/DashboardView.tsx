import * as  React from 'react';
import { Container, Jumbotron, Button, PageHeader } from 'react-bootstrap';
import { store, StoreUtils } from '../Store'
import { CenteredPanel } from '../components/CenteredPanel'

export class DashboardView extends React.Component{
  render(){
    return <Jumbotron>
              { (StoreUtils.isAuthenticated() == false) ?
                  <CenteredPanel sm={8} md={10} lg={10} >
                    <PageHeader> Welcome Stranger! </PageHeader>
                    <p><span><b><a href='#/user/login'>Login</a> ...if You already have an account. </b></span></p>
                    <p><span><b><a href='#/user/register'>Sign In</a> ...if You are here for the first time.</b></span></p>
                  </CenteredPanel>
                  :
                  <CenteredPanel sm={8} md={10} lg={10}>
                    <PageHeader> Welcome <b>{StoreUtils.currentUser()}</b>! </PageHeader>
                    <p><b><a href='#/products/list'>See your catalog.</a></b></p>
                    <p><b><a href='#/pricelists/list'>See your price lists.</a></b></p>
                  </CenteredPanel>
              }
           </Jumbotron>
  }
}
