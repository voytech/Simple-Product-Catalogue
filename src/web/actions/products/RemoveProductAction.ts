import { REMOVE_PRODUCT, LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removeProductAction = (product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return http.post(productsUrl('remove'),JSON.stringify(product))
}

export const removeAndLoadProductsAction = (product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix+'/getall';
    return http.post(productsUrl('remove'),JSON.stringify(product))
}
