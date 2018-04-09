import * as  React from 'react';
import { EditorComponent } from '../../components/editors/EditorComponent';
import { EditorStep } from '../../components/editors/EditorStep';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductProperties } from './ProductProperties';
import { ProductAttachments } from './ProductAttachments';
import { ProductImages } from './ProductImages';
import { Product, ProductProperty, ImageData, ResourceData } from '../../actions/products/Model';
import { addPropertyAction } from '../../actions/products/AddPropertyAction'
import { removePropertyAction } from '../../actions/products/RemovePropertyAction'
import { uploadImageAction } from '../../actions/products/UploadImageAction'
import { removeImageAction } from '../../actions/products/RemoveImageAction'
import { uploadAttachmentAction } from '../../actions/products/UploadAttachmentAction'
import { removeAttachmentAction} from '../../actions/products/RemoveAttachmentAction'

interface ProductEditorViewProps{
  saveProduct : (product : Product) => void;
  product ?: Product;
  editMode ?: boolean;
  withHeading ?:boolean;
}

interface ProductEditorViewState {
  product ?: Product;
}

export class ProductEditor extends React.Component<ProductEditorViewProps,ProductEditorViewState> {

  constructor(props){
    super(props);
    this.state = { }
  }

  componentDidMount(){
    if (this.props.product){
      this.setState({product : this.props.product})
    }
  }

  addProperty = (property : ProductProperty) => {
    addPropertyAction(this.state.product.name,property).then(response =>
      this.setState({product : response.data}))
  }

  removeProperty = (propertyName : string) => {
    removePropertyAction(this.state.product.name,propertyName).then(response =>
      this.setState({product: response.data}))
  }

  uploadImage = (image : ImageData) => {
    uploadImageAction(this.state.product.name,image).then(response =>
      this.setState({product: response.data}))
  }

  removeImage = (imageName: string ) => {
    removeImageAction(this.state.product.name,imageName).then(response =>
      this.setState({product: response.data}))
  }

  uploadAttachment = (attachment : ResourceData) => {
    uploadAttachmentAction(this.state.product.name,attachment).then(response =>
      this.setState({product: response.data}))
  }

  removeAttachment = (attachmentName: string ) => {
    removeAttachmentAction(this.state.product.name,attachmentName).then(response =>
      this.setState({product: response.data}))
  }

  render(){
    return <EditorComponent withHeading={this.props.withHeading} toggleText='New Product'>
              <EditorStep title="Basic Info" step={1}>
                <ProductBasicInfo saveProduct={this.props.saveProduct}
                                  product={this.state.product}
                                  editMode={this.props.editMode}/>
              </EditorStep>
              <EditorStep title="Product Specification" step={2}>
                <ProductProperties product={this.state.product}
                                   addProperty={this.addProperty}
                                   removeProperty={this.removeProperty}/>
              </EditorStep>
              <EditorStep title="Images" step={3}>
                <ProductImages product={this.state.product}
                               uploadImage={this.uploadImage}
                               removeImage={this.removeImage}/>
              </EditorStep>
              <EditorStep title="Attachments" step={4}>
                <ProductAttachments product={this.state.product}
                                    uploadAttachment={this.uploadAttachment}
                                    removeAttachment={this.removeAttachment}/>
              </EditorStep>
           </EditorComponent>
  }
}
