import { CREATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const createProductAction = (product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return http.post(productsUrl('create'),JSON.stringify(product))
}
