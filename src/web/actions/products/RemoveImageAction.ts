import { REMOVE_IMAGE } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removeImageAction = StoreUtils.createAction((productName : string,imageName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/images/'+imageName;
    return (dispatch) => {
      http.delete(url(productName,imageName))
          .then(response => { dispatch({type: REMOVE_IMAGE, payload: {}})})
          .catch(error => console.error(error));
    }
});
