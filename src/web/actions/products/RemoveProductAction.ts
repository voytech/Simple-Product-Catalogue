import { REMOVE_PRODUCT, REMOVE_LOAD_PRODUCTS } from '../../consts/Actions';
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

export const removeAndLoadProductsAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix+'/getall';
    return (dispatch) => {
      http.post(productsUrl('remove'),JSON.stringify(product))
          .then(response => { dispatch({type: REMOVE_LOAD_PRODUCTS, payload: { products: response.data } })})
          .catch(error => console.error(error));
    }
});
