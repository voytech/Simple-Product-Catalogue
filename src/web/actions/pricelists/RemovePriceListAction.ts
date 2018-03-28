import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePriceListAction = StoreUtils.createAction((productName : string,attachmentName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/attachments/'+attachmentName;
    return (dispatch) => {
      http.delete(url(productName,attachmentName))
          .then(response => { dispatch({type: UPDATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
