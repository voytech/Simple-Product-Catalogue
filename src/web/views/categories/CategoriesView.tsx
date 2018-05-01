import * as  React from 'react';

import { Formik, Form, FormikProps  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Button, FormGroup, FormControl,
         Glyphicon , Panel,
         ListGroup, ListGroupItem, Row, Col  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'

import { CenteredPanel } from '../../components/CenteredPanel';
import { TreeView, TreeItem, TreeItemImpl } from '../../components/treeview/TreeView';
import { withItemEditor } from '../../components/treeview/extensions/TreeItemEditor';
import { loadCategoriesAction } from '../../actions/categories/LoadCategoriesAction';
import { createCategoryAction } from '../../actions/categories/CreateCategoryAction';
import { deleteCategoryAction } from '../../actions/categories/DeleteCategoryAction';
import { Category  } from '../../actions/categories/Model'

interface CategoriesViewProps{

}

interface CategoriesViewState {
  categories : Category[]
}


const EditableTreeView = withItemEditor<Category>()(TreeView)

export class CategoriesView extends React.Component<CategoriesViewProps, CategoriesViewState> {

  constructor(props){
    super(props);
    this.state = {
      categories : []
    };
  }

  createCategory = (category : Category) => {
    createCategoryAction(category).then(result => this.loadCategories())
  }

  private toTreeItem = (category : Category) => {
      return new TreeItemImpl(
        category.name,
        category.childs? category.childs.map(this.toTreeItem) : [],
        category
      )
  }

  deleteCategory = (item : TreeItem<Category>) => {
    deleteCategoryAction(item.details.name).then(result => this.loadCategories())
  }

  loadCategories = () => {
    loadCategoriesAction().then(result => {
      let treeItems = result.data.map(this.toTreeItem);
      console.log(treeItems);
      this.setState({categories : result.data})
    })
  }

  updateCategory = (category : Category) : Promise<{data : Category}> => {
    return null;
  }

  addRootCategory = (category : Category) => {
    createCategoryAction(category).then(data => {
      this.loadCategories()
    })
  }

  addCategory = (name : string, description : string, forParent : TreeItem<Category>) => {
    this.createCategory({
      parent : forParent.details,
      name : name,
      description : description
    })
  }

  componentDidMount(){
    this.loadCategories()
  }

  renderTest(){
    let items =  this.state.categories ? this.state.categories.map(this.toTreeItem) : [];
    return <>
          <Formik
              initialValues={ { } }
              onSubmit={(values: Category) => this.addRootCategory(values)}
              render={(props : FormikProps<Category>) => (
                 <Form className="form-inline mb-1">
                    <FormGroup className="ml-1">
                      <FormControl name='name'
                                   type='text'
                                   value={props.values.name}
                                   onChange={props.handleChange}>
                      </FormControl>
                    </FormGroup>
                    <FormGroup className="ml-1">
                      <FormControl name='description'
                                   type='text'
                                   value={props.values.description}
                                   onChange={props.handleChange}>
                      </FormControl>
                    </FormGroup>
                    <Button className="ml-1" bsStyle="primary" type="submit" >
                      <Glyphicon glyph='plus-sign'/>
                    </Button>
                </Form>
            )}/>
            <EditableTreeView
              newItem={(details,item) => this.addCategory(details.name,details.description,item)}
              delete={(item) => this.deleteCategory(item)}
              edit={(item) => alert("Editing "+item)}
              data={items}/>
           </>
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
