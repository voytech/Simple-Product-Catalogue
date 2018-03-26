import { UPLOAD_ATTACHMENT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const uploadAttachmentAction = StoreUtils.createAction((productName:string, attachment : any) => {
    let productsUrl = (suffix) => 'products/'+productName+'/'+suffix;
    return (dispatch) => {
      http.post(productsUrl('uploadAttachment'),JSON.stringify(attachment))
          .then(response => { dispatch({type: UPLOAD_ATTACHMENT, payload: response.data })})
          .catch(error => console.error(error));
    }
});
