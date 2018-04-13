import * as  React from 'react';

import { Formik, Form  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Button,
         Glyphicon , Panel,
         ListGroup, ListGroupItem, Row, Col  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'

import { CenteredPanel } from '../../components/CenteredPanel';
import { TreeView, TreeItem, TreeItemImpl } from '../../components/treeview/TreeView';
import { withItemEditor } from '../../components/treeview/extensions/TreeItemEditor';
import { loadCategoryTreesAction } from '../../actions/categories/LoadCategoryTreesAction';
import { createCategoryAction } from '../../actions/categories/CreateCategoryAction';
import { Category, CategoryTree, CategoryTreeImpl  } from '../../actions/categories/Model'

interface CategoriesViewProps{

}

interface CategoriesViewState {
  categories : CategoryTree[]
}


const EditableTreeView = withItemEditor()(TreeView)

export class CategoriesView extends React.Component<CategoriesViewProps, CategoriesViewState> {

  constructor(props){
    super(props);
    this.state = {
      categories : []
    };
  }

  createCategory = (category : Category) => {
    createCategoryAction(category).then(result => this.loadCategoriesTree())
  }

  loadCategoriesTree = () => {
    loadCategoryTreesAction().then(result => this.setState({categories : result.data}))
  }

  updateCategory = (category : Category) : Promise<{data : Category}> => {
    return null;
  }

  componentDidMount(){
    this.loadCategoriesTree()
  }



  renderTest(){
    let items = [
      new TreeItemImpl('Root Category 1',[
        new TreeItemImpl('Child 1',[]),
        new TreeItemImpl('Child 2',[
          new TreeItemImpl('Child 1',[])
        ]),
        new TreeItemImpl('Child 3',[]),
      ]),
      new TreeItemImpl('Root Category 2',[
        new TreeItemImpl('Child 1',[]),
        new TreeItemImpl('Child 2',[]),
      ]),
      new TreeItemImpl('Root Category 3',[])
    ]
    return <EditableTreeView data={items}/>
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               <Row>
                 <Col sm={6}>
                   {this.renderTest()}
                 </Col>
                 <Col sm={6}>
                   <Panel>
                     <Panel.Heading>
                       <Panel.Title>Category Details.</Panel.Title>
                     </Panel.Heading>
                     <Panel.Body>
                       This are details.
                     </Panel.Body>
                   </Panel>
                 </Col>
               </Row>
             </CenteredPanel>
  }

}
