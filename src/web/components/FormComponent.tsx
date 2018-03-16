import * as  React from 'react';
import { FormGroup,
         FormControl,
         HelpBlock,
         ControlLabel,
         Col, Panel,
         Button,
         ButtonToolbar  } from 'react-bootstrap';
import { FormEvent } from '../utils/FormUtils';

export interface IFormFieldDef{
   fieldName : string;
   fieldDisplay : string;
   fieldType : string;
   defaultValue : string;
   validators ?: ((value: any) => false | string)[]
}

export class Field implements IFormFieldDef {
  constructor(
    public fieldName :string,
    public fieldDisplay: string,
    public fieldType: string,
    public defaultValue:string,
    public validators ?: ((value: any) => false | string)[]){}
}

export interface IFieldData {
  fieldName : string;
  value : any;
  validationMessage ?: string;
}

export interface IFormData {
  data: IFieldData[];
}

export interface IFormProperties {
    definition : IFormFieldDef[];
    onChange : (field : IFieldData, state: IFormData) => any
}

export const fields = (...iFormFieldDef : IFormFieldDef[]) => {
  return iFormFieldDef;
}

export class FormComponent extends React.Component<IFormProperties,IFormData>{

  constructor(props){
    super(props);
    this.initializeState()
  }

  private initializeState(){
    this.state = { data : this.props.definition.map(fd => { return { fieldName:fd.fieldName, value: fd.defaultValue}}) };
  }

  private updateState(fieldData : IFieldData) : IFormData {
    let copy = this.state.data.filter(e => fieldData.fieldName !== e.fieldName).concat(fieldData);
    this.setState({data : copy});
    return {data : copy};
  }

  private updateDataFunction(field : IFormFieldDef){
    return (e: FormEvent) => {
      let fieldData = {fieldName : field.fieldName, value: e.currentTarget.value};
      this.props.onChange(fieldData,this.updateState(fieldData));
    };
  }

  private getFieldData(field){
    let element = this.state.data.filter(e => e.fieldName === field.fieldName)[0];
    if (element){
      return element.value;
    } else {
      return field.defaultValue;
    }
  }

  private validate(field){
    let fieldData = this.state.data.filter(e => e.fieldName === field.fieldName)[0];
    let fieldMeta = this.props.definition.filter(e => e.fieldName === field.fieldName)[0];
    if (fieldMeta.validators){
      let vResults = fieldMeta.validators.map(v => v(fieldData.value));
      fieldData.validationMessage = vResults.filter(Boolean).join('\n');
      if (fieldData.validationMessage && fieldData.validationMessage.length > 0){
        return 'error'
      } else {
        return 'success'
      }
    }
    return 'success';
  }

  private fieldValidationResult(field){
    let fieldData = this.state.data.filter(e => e.fieldName === field.fieldName)[0];
    if (fieldData){
      return fieldData.validationMessage || '';
    }
  }

  static getValue(form: IFormData,fieldName: String) : any {
    let fieldData = form.data.filter(e => fieldName === e.fieldName)[0];
    if (fieldData){
      return fieldData.value;
    } else {
      return null;
    }
  }

  buildField = (field: IFormFieldDef) => {
    return  <FormGroup key={field.fieldName}
                       validationState={this.validate(field)}>
               <ControlLabel>{field.fieldDisplay}</ControlLabel>
               <FormControl type={field.fieldType} value={this.getFieldData(field)} onChange={this.updateDataFunction(field)}></FormControl>
               <HelpBlock>{this.fieldValidationResult(field)}</HelpBlock>
            </FormGroup>
  }

  render(){
    return <form>
             {this.props.definition.map(this.buildField)}
           </form>
  }
}
