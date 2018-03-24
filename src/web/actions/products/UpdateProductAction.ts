import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const updateProductAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('save'),JSON.stringify(product))
          .then(response => { dispatch({type: UPDATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
