import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePropertyAction = (productName : string,propertyName : string) => {
    let url = (productName:string, attachmentName:string) => 'products/'+productName+'/properties/'+propertyName;
    return http.delete(url(productName,propertyName))
}
