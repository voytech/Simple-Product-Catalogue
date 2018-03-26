import * as  React from 'react';
import { Glyphicon, Label } from 'react-bootstrap';

export class FileButton extends React.Component<any> {

  constructor(props){
    super(props);
  }

  render(){
    let {title , buttonClass , ...rest} = this.props;
    return <label className={'btn '+ buttonClass + ' btn-file'}>
              <Glyphicon glyph='cloud-upload' /> {title}
              <input { ... rest } type="file" style={{display: 'none'}}/>
           </label>
  }
}
