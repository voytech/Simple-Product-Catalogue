import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePriceListItemAction = (productName : string,attachmentName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/attachments/'+attachmentName;
    return http.delete(url(productName,attachmentName))
}
