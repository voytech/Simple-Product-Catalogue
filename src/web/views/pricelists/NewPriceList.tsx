import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Col, Row,
         Button, Panel,
         Glyphicon,
         ButtonToolbar,
         ListGroup, ListGroupItem, FormControl  } from 'react-bootstrap';
import { PriceList } from '../../actions/pricelists/Model'
import { defaultPriceList } from './Utils'
import { PriceListBasicInfo } from './PriceListBasicInfo'

interface PriceListDetailsProps{
  createPriceList : (priceList : PriceList) => void;
}

export class NewPriceList extends React.Component<PriceListDetailsProps>{

  constructor(props){
    super(props);
  }

  render(){
    return <PriceListBasicInfo createOrUpdatePriceList={this.props.createPriceList}/>
  }
}
