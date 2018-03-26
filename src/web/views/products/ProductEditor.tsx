import * as  React from 'react';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'
import { ProductBasicInfoEditor } from './ProductBasicInfoEditor';
import { ProductImages } from './ProductImages';
import { Product, ProductProperty } from './Model'

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
                <ProductBasicInfoEditor saveProduct={this.props.saveProduct} product={this.props.product} editMode={this.props.editMode}/>
              </EditorStep>
              <EditorStep title="Technical Details" step={2}>
                <div>Properties</div>
              </EditorStep>
              <EditorStep title="Images" step={3}>
                <ProductImages product={this.props.product}/>
              </EditorStep>
              <EditorStep title="3d" step={4}>
                <div>3D Models</div>
              </EditorStep>
              <EditorStep title="Attachments" step={5}>
                <div>Attachments</div>
              </EditorStep>
           </EditorComponent>
  }
}
