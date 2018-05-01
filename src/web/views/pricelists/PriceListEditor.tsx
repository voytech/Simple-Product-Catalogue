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
import { loadProductsIdentsAction } from '../../actions/products/LoadProductsAction';
import { loadPriceListAction } from '../../actions/pricelists/LoadPriceListAction';
import { updatePriceListAction } from '../../actions/pricelists/UpdatePriceListAction';

interface PriceListEditorState{
  priceList ?: PriceList
  productsKeys ?: [{name:string, _id:string}];
}

interface PriceListDetailsProps{
  updatePriceList ?: (update : PriceList) => Promise<{data : PriceList }>
  loadPriceList ?: (name : string) => Promise<{data : PriceList }>
  priceList ?: PriceList;
}

export class PriceListEditor extends React.Component<PriceListDetailsProps,PriceListEditorState>{

  constructor(props){
    super(props);
    this.state = { }
  }

  componentDidMount(){
    this.loadProductsKeys()
    this.loadPriceList(this.props.priceList.name)
  }

  private setResult = (result) =>  this.setState({priceList: result.data})

  loadProductsKeys = () => {
    loadProductsIdentsAction().then(idents =>
      this.setState({productsKeys: idents.data}))
  }

  updatePriceList = (priceList : PriceList) => {
    (this.props.updatePriceList || updatePriceListAction)(priceList).then(this.setResult)
  }

  addPriceListItem = (assignment : PriceAssignement) => {
    addPriceListItemAction(assignment).then(() => this.loadPriceList(assignment.priceList))
  }

  loadPriceList = (name : string) => {
    (this.props.loadPriceList || loadPriceListAction)(name).then(this.setResult)
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
                {this.state.priceList &&
                 this.state.priceList.items &&
                 this.state.priceList.items.map(item => this.renderListItem(item))}
              </ListGroup>
            </div>
  }

  productEntries = () => {
    return <Formik
              initialValues={ { product : '', price: 0, priceList : this.props.priceList && this.props.priceList.name } }
              onSubmit={(values: PriceAssignement) => this.addPriceListItem(values)}
              render={(props : FormikProps<PriceAssignement>) => (
                 <Form className="form-inline">
                    <FormGroup className="ml-1">
                      <FormControl name='product'
                                   value={props.values.product}
                                   onChange={props.handleChange}
                                   componentClass="select" placeholder="select">
                        {this.state.productsKeys && this.state.productsKeys.map(key =>
                          <option key={key.name} value={key.name}>{key.name}</option>)}
                      </FormControl>
                    </FormGroup>
                    <InputGroup className="ml-1">
                      <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl name='price'
                                     value={props.values.price}
                                     type="text"
                                     onChange={props.handleChange} />
                      <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                    <Button className="ml-1" bsStyle="primary" type="submit" >
                      <Glyphicon glyph='save'/>
                    </Button>
                </Form>
              )}/>
  }


  render(){
    return <EditorComponent>
              <EditorStep title="Basic Info" step={1}>
                <PriceListBasicInfo createOrUpdatePriceList={this.updatePriceList}
                                    priceList={this.state.priceList}
                                    editMode={true}/>
              </EditorStep>
              <EditorStep title="Assign Prices" step={2}>
                <Panel>
                  <Panel.Heading>
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
