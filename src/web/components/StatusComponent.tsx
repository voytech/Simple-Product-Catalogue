import * as  React from 'react';
import { Label } from 'react-bootstrap';

export interface StatusProperties {
  status:string;
}

export class StatusComponent extends React.Component<StatusProperties> {

  constructor(props){
    super(props);
  }

  applyVisual(){
    switch (this.props.status){
      case 'draft': return 'default';
      case 'published': return 'warning';
      case 'live': return 'success';
      case 'archive': return 'danger';
      default : return 'default';
    }
  }

  render() {
    return <h4>
            <Label bsStyle={this.applyVisual()}>{this.props.status}</Label>
           </h4>
  }
}
