import { UPDATE_PRODUCT, LOAD_PRODUCTS } from '../../consts/Actions';
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

export const updateAndLoadProductsAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix+'/getall';
    return (dispatch) => {
      http.post(productsUrl('save'),JSON.stringify(product))
          .then(response => { dispatch({type: LOAD_PRODUCTS, payload: { products: response.data } })})
          .catch(error => console.error(error));
    }
});
