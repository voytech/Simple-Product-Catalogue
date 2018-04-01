import * as  React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { Button, Panel,
         Glyphicon,
         ButtonToolbar,
         ListGroup, ListGroupItem, FormControl, FormGroup,InputGroup  } from 'react-bootstrap';
import { PriceListBasicInfo } from './PriceListBasicInfo'
import { EditorComponent } from '../../components/editors/EditorComponent';
import { EditorStep } from '../../components/editors/EditorStep';
import { PriceList, PriceListItem, PriceAssignement } from '../../actions/pricelists/Model'
import { addPriceListItemAction } from '../../actions/pricelists/AddPriceListItemAction'

interface PriceListStateEntry {
  toggle : boolean,
  price  : number
}

interface PriceListEditorState{
  [name:string] : PriceListStateEntry
}

interface PriceListDetailsProps{
  addPriceListItem : (item : PriceAssignement) => void;
  updatePriceList : (update : PriceList) => void;
  priceList ?: PriceList;
  loadPriceList : (name : string) => void;
  productsKeys ?: [{name:string, _id:string}];
}

export class PriceListEditor extends React.Component<PriceListDetailsProps,PriceListEditorState>{

  constructor(props){
    super(props);
    this.state = {}
  }


  componentDidMount(){
    console.log(this.props.priceList.name);
    this.props.loadPriceList(this.props.priceList.name);
  }

  renderListItem = (item) => {
    return <ListGroupItem key={item.name}>
              <b>{item.name}</b> : {item.price}
              <Button className='pull-right' bsSize='xsmall' bsStyle="danger" onClick={() => alert('remove')}>
                <Glyphicon glyph='trash'/>
              </Button>
           </ListGroupItem>;
  }

  renderItems = () => {
    return <div style={{overflow: 'auto', maxHeight: 400}}>
              <ListGroup>
                {this.props.priceList &&
                 this.props.priceList.items &&
                 this.props.priceList.items.map(item => this.renderListItem(item))}
              </ListGroup>
            </div>
  }

  productEntries = () => {
    return <Formik
              initialValues={ { product : '', price: 0, priceList : this.props.priceList && this.props.priceList.name } }
              onSubmit={(values: PriceAssignement) => this.props.addPriceListItem(values)}
              render={(props : FormikProps<PriceAssignement>) => (
                 <Form className="form-inline">
                    <FormGroup>
                      <FormControl name='product'
                                   value={props.values.product}
                                   onChange={props.handleChange}
                                   componentClass="select" placeholder="select">
                        {this.props.productsKeys && this.props.productsKeys.map(key =>
                          <option key={key.name} value={key.name}>{key.name}</option>)}
                      </FormControl>
                    </FormGroup>
                    <InputGroup>
                      <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl name='price'
                                     value={props.values.price}
                                     type="text"
                                     onChange={props.handleChange} />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                    <Button bsStyle="primary" type="submit" >
                      <Glyphicon glyph='save'/>
                    </Button>
                </Form>
              )}/>
  }


  render(){
    return <EditorComponent>
              <EditorStep title="Basic Info" step={1}>
                <PriceListBasicInfo createOrUpdatePriceList={this.props.updatePriceList}
                                    priceList={this.props.priceList}
                                    editMode={true}/>
              </EditorStep>
              <EditorStep title="Items" step={2}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title><b>Assign prices</b></Panel.Title>
                    {this.productEntries()}
                  </Panel.Heading>
                  <Panel.Body>
                    {this.renderItems()}
                  </Panel.Body>
                </Panel>
              </EditorStep>
           </EditorComponent>
  }
}