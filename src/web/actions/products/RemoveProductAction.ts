import { REMOVE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removeProductAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('remove'),JSON.stringify(product))
          .then(response => { dispatch({type: REMOVE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
