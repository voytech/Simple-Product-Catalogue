import { LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadPriceListAction = StoreUtils.createAction(()=>{
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.get(productsUrl('all')).then(response => { dispatch({type: LOAD_PRODUCTS, payload: { products: response.data }})})
          .catch(error => console.error(error));
    }
});
