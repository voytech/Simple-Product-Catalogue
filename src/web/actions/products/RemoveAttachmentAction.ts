import { REMOVE_ATTACHMENT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removeAttachmentAction = StoreUtils.createAction((productName : string,attachmentName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/attachments/'+attachmentName;
    return (dispatch) => {
      http.delete(url(productName,attachmentName))
          .then(response => { dispatch({type: REMOVE_ATTACHMENT, payload: {}})})
          .catch(error => console.error(error));
    }
});
