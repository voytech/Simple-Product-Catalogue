import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const uploadAttachmentAction = (productName:string, attachment : any) => {
    let productsUrl = (suffix) => 'products/'+productName+'/'+suffix;
    return http.post(productsUrl('uploadAttachment'),JSON.stringify(attachment))
}
