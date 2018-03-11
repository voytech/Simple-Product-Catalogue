import * as  React from 'react';
import * as  ReactDOM  from 'react-dom';
import { Container, Row, Col } from 'reactstrap';

export class Main extends React.Component {

  render(){
    return <div>
             <h2>Simple Product Catalogue</h2>
             <Container>
               This is container
               <Row>
                 <Col>.col</Col>
               </Row>
             </Container>
           </div>
  }
}
