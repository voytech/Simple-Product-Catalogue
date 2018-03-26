import * as  React from 'react';
import { FileButton  } from '../../components/FileButton';
import { Panel, Button, FormGroup, ControlLabel, FormControl,
         Glyphicon, Label, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Product, ResourceData, ProductProperty } from './Model'
import { http } from '../../Config'
import { uploadAttachmentAction } from '../../actions/products/UploadAttachmentAction'

interface ProductAttachmentsProps{
   product ?: Product;
}

interface ProductAttachmentsState{
  attachments ?: ResourceData[];
}

export class ProductAttachments extends React.Component<ProductAttachmentsProps,ProductAttachmentsState>{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    if (this.props.product){
      http.get('products/'+this.props.product.name+'/attachments').then((attachments)=>{
        this.setState({attachments: attachments.data});
      });
    }
  }

  handleFileUpload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener("load", (event) => {
        uploadAttachmentAction(this.props.product.name,{
          name: file.name,
          data : (event.target as any).result
        });
    }, false);
    reader.readAsDataURL(file);
  }

  renderListItem(item,index) {
    return <ListGroupItem key={index}>
              <b>{item.name}</b>
           </ListGroupItem>;
  }

  render(){
    return  <Panel>
              <Panel.Heading>
                <FileButton title='Upload a File' buttonClass='btn-primary' onChange={this.handleFileUpload}/>
              </Panel.Heading>
              <Panel.Body>
                <div style={{overflow: 'auto', maxHeight: 400}}>
                  <ListGroup>
                    {this.state.attachments && this.state.attachments.map(this.renderListItem)}
                  </ListGroup>
                </div>
              </Panel.Body>
            </Panel>

  }
}
