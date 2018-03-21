import * as  React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { FormGroup,
         FormControl,
         HelpBlock,
         ControlLabel,
         Col, Row,
         Button,
         ButtonToolbar  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'
import { ListViewComponent } from '../../components/lists/ListViewComponent'
import { CenteredPanel } from '../../components/CenteredPanel';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { store } from '../../Store';

interface IProperty {
  name : string;
  value : string;
}

interface IProduct {
  name: string;
  code: string;
  category : string;
  description: string;
  startDate : string;
  effectiveStartDate : string;
  endDate : string;
  effectiveEndDate : string;
  type: string;
  tags: string[];
  properties : IProperty[];
  images : string[];
  attachments : string[];
}

export class ProductListView extends React.Component {

  private renderDetails(){
    return  <Formik
              initialValues={{ }}
              validate={values => {}}
              onSubmit={(values: IProduct) => console.log(values)}
              render={(props : FormikProps<IProduct>) => (
                <Form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <Row className='mt-2'>
                  <HFormGroup name='name' display='Product Name' value={props.values.name} type='text' onChange={props.handleChange} controlWidth={4}/>
                  <HFormGroup name='description' display='Description' value={props.values.description} type='text' componentClass='textarea' onChange={props.handleChange} controlWidth={6}/>
                  <HFormGroup name='category' display='Category' value={props.values.category} type='text' onChange={props.handleChange} controlWidth={4} />
                  <HFormGroup name='startDate' display='Start Date' value={props.values.startDate} type='date' onChange={props.handleChange} controlWidth={4} />
                  <HFormGroup name='endDate' display='End Date' value={props.values.endDate} type='date' onChange={props.handleChange} controlWidth={4} />
                  <HFormGroup name='effectiveStartDate' display='Effective Start Date' value={props.values.effectiveStartDate} type='date' onChange={props.handleChange} controlWidth={4} />
                  <HFormGroup name='effectiveEndDate' display='Effective End Date' value={props.values.effectiveEndDate} type='date' onChange={props.handleChange} controlWidth={4} />
                  </Row>
                </Form>
              )}/>
  }
  render(){
      return <CenteredPanel lg={10} sm={6} md={10}>
                <EditorComponent title="Create New Product">
                  <EditorStep title="Basic Details" step={1}>
                    {this.renderDetails()}
                  </EditorStep>
                  <EditorStep title="Images" step={2}>
                    <div>Images</div>
                  </EditorStep>
                  <EditorStep title="Attachments" step={3}>
                    <div>Attachments</div>
                  </EditorStep>
                 </EditorComponent>
                 <ListViewComponent columns={["Name","Description","Start Date","End Date"]}></ListViewComponent>
             </CenteredPanel>
  }

  /*

  */
}
