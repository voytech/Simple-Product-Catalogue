import * as  React from 'react';
import { Panel, Button, Glyphicon,Tab  } from 'react-bootstrap';

export interface IEditorStepProps {
  title ?: string;
  step : number;
}

interface IEditorStepState{
  open : boolean;
}

export class EditorStep extends React.Component<IEditorStepProps,IEditorStepState>{

  constructor(props){
    super(props);
    this.state = {open : false};
  }


  render(){
      return <>{this.props.children}</>
  }
}
