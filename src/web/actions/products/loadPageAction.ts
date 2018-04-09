import { LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadProductsPageAction = StoreUtils.createAction((offset,pageSize) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.get(productsUrl('pageWithTotal?offset='+offset+'&size='+pageSize))
          .then(response => { dispatch({type: LOAD_PRODUCTS, payload: {
            products: {
              data : response.data.data,
              meta: {
                total : response.data.collCount,
                offset : offset,
                pageSize : pageSize
              }
           }}})})
          .catch(error => console.error(error));
    }
  });
