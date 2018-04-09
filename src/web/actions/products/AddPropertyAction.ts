import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const addPropertyAction = (productName:string, property : any) => {
    let productsUrl = (suffix) => 'products/'+productName+'/'+suffix;
    return http.post(productsUrl('addProperty'),JSON.stringify(property))
}
