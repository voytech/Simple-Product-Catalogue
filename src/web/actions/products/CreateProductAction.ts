import { CREATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';

export function createProduct(product : any){
  let productsUrl = (suffix) => 'v1/products/'+suffix;
  return (dispatch) => {
    fetch(productsUrl('create'),{
      method: 'post',
      headers: { "Content-type": "application/json",
                 "Authorization": "Bearer "+StoreUtils.getAuthToken()},
      body: JSON.stringify(product)
    }).then(response =>
              response.json().then((result) =>
                                     dispatch({type: CREATE_PRODUCT,payload: result })))
      .catch(error => console.error(error));
  }
}
;
