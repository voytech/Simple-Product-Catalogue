import { LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';

export const loadProductsAction = StoreUtils.createAction((product : any)=>{
    let productsUrl = (suffix) => 'v1/products/'+suffix;
    return (dispatch) => {
      fetch(productsUrl('all'),{
        method: 'get',
        headers: { "Content-type": "application/json",
                   "Authorization": "Bearer " + StoreUtils.getAuthToken()},
        body: JSON.stringify(product)
      }).then(response =>
                response.json().then((result) =>
                                       dispatch({type: LOAD_PRODUCTS, payload: { products: result }})))
        .catch(error => console.error(error));
    }
  });
