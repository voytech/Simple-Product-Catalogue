import * as  React from 'react';
import { EditorComponent } from '../../components/editors/EditorComponent';
import { EditorStep } from '../../components/editors/EditorStep';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductProperties } from './ProductProperties';
import { ProductAttachments } from './ProductAttachments';
import { ProductImages } from './ProductImages';
import { Product, ProductProperty } from './Model';

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
  }

  render(){
    return <EditorComponent withHeading={this.props.withHeading} toggleText='New Product'>
              <EditorStep title="Basic Info" step={1}>
                <ProductBasicInfo saveProduct={this.props.saveProduct} product={this.props.product} editMode={this.props.editMode}/>
              </EditorStep>
              <EditorStep title="Product Specification" step={2}>
                <ProductProperties product={this.props.product}/>
              </EditorStep>
              <EditorStep title="Images" step={3}>
                <ProductImages product={this.props.product}/>
              </EditorStep>
              <EditorStep title="Attachments" step={4}>
                <ProductAttachments product={this.props.product}/>
              </EditorStep>
           </EditorComponent>
  }
}
