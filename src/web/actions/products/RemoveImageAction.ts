import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removeImageAction = (productName : string,imageName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/images/'+imageName;
    return http.delete(url(productName,imageName))
}
