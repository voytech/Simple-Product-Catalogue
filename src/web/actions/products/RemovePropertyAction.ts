import { REMOVE_PROPERTY } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePropertyAction = StoreUtils.createAction((productName : string,propertyName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/properties/'+propertyName;
    return (dispatch) => {
      http.delete(url(productName,propertyName))
          .then(response => { dispatch({type: REMOVE_PROPERTY, payload: {}})})
          .catch(error => console.error(error));
    }
});
