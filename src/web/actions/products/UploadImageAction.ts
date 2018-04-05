import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const uploadImageAction = StoreUtils.createAction((productName:string, image : any) => {
    let productsUrl = (suffix) => 'products/'+productName+'/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('uploadImage'),JSON.stringify(image))
          .then(response => { dispatch({type: UPDATE_PRODUCT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
