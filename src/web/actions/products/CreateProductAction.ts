import { CREATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const createProductAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('create'),JSON.stringify(product))
          .then(response => { dispatch({type: CREATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
  });
