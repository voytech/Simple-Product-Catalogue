import * as  React from 'react';

import { Formik, Form  } from 'formik';
import { VFormGroup  } from '../../components/forms/VFormGroup';
import { HFormGroup  } from '../../components/forms/HFormGroup';
import { Button,
         Glyphicon ,
         ListGroup, ListGroupItem, Row, Col  } from 'react-bootstrap';
import { EditorComponent } from '../../components/editors/EditorComponent'
import { EditorStep } from '../../components/editors/EditorStep'

import { CenteredPanel } from '../../components/CenteredPanel';
import { loadCategoryTreesAction } from '../../actions/categories/LoadCategoryTreesAction';
import { createCategoryAction } from '../../actions/categories/CreateCategoryAction';
import { Category, CategoryTree, CategoryTreeImpl  } from '../../actions/categories/Model'

interface CategoriesViewProps{

}

interface CategoriesViewState {
  categories : CategoryTree[]
}

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

  identLevel = (level) => {
    return  {
      marginLeft : (level*30)
    }
  }

  treeNode = (level,title,toggle,content) => {
    return <div style={this.identLevel(level)}>
              <Row>
                <div className='pull-left' style={{marginRight:15}}>
                  <a><Glyphicon glyph={toggle == false ? "triangle-bottom" : "triangle-top"} /></a></div>
                <div className='pull-left'>title</div>
              </Row>
           </div>
  }

  iterate = (roots) => {
     return null;
  }

  renderTree(){
    return <ListGroup>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 1',true,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(2,'child 1',true,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(3,'child  1 1',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(3,'child  1 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(2,'child 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 2',false,null)}</ListGroupItem>
            <ListGroupItem  href="#" >{this.treeNode(1,'root 3',false,null)}</ListGroupItem>
          </ListGroup>
  }

  render(){
      return <CenteredPanel lg={12} sm={12} md={12}>
               {this.renderTree()}
             </CenteredPanel>
  }

}
