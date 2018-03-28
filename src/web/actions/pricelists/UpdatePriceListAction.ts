import { UPDATE_PRODUCT, UPDATE_LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const updatePriceListActoin = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('save'),JSON.stringify(product))
          .then(response => { dispatch({type: UPDATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
