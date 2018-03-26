import { UPLOAD_IMAGE } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const uploadImageAction = StoreUtils.createAction((upload : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('uploadImage'),JSON.stringify(upload))
          .then(response => { dispatch({type: UPLOAD_IMAGE, payload: response.data })})
          .catch(error => console.error(error));
    }
});
