import * as  React from 'react';


export class AppContainer extends React.Component<any,{hasError : boolean}> {

  constructor(props){
    super(props);
    this.state = {hasError : false};
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render(){
      return <>
        {this.state.hasError && <h1>An error occured</h1>}
        {this.props.children}
      </>
  }
}
