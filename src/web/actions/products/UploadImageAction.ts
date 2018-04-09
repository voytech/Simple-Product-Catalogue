import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const uploadImageAction = (productName:string, image : any) => {
    let productsUrl = (suffix) => 'products/'+productName+'/'+suffix;
    return http.post(productsUrl('uploadImage'),JSON.stringify(image))
}
