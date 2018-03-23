import { REMOVE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';

export const removeProductAction = StoreUtils.createAction((product : any) => {
    let productsUrl = (suffix) => 'v1/products/'+suffix;
    return (dispatch) => {
      fetch(productsUrl('remove'),{
        method: 'post',
        headers: { "Content-type": "application/json",
                   "Authorization": "Bearer " + StoreUtils.getAuthToken()},
        body: JSON.stringify(product)
      }).then(response =>
                response.json().then((result) =>
                                       dispatch({type: REMOVE_PRODUCT, payload: result })))
        .catch(error => console.error(error));
    }
  });
