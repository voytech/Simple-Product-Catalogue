import { UPDATE_PRODUCT, LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const updateProductAction = (product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return http.post(productsUrl('save'),JSON.stringify(product))
}

export const updateAndLoadProductsAction = (product : any) => {
    let productsUrl = (suffix) => 'products/'+suffix+'/getall';
    return http.post(productsUrl('save'),JSON.stringify(product))
}
