import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const addPriceListItemAction = StoreUtils.createAction((productName:string, property : any) => {
    let url = (suffix) => 'products/'+productName+'/'+suffix;
    return (dispatch) => {
      http.post(url('addProperty'),JSON.stringify(property))
          .then(response => { dispatch({type: UPDATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
