import { LOAD_ENTITY_KEYS, LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadProductsAction = ()=>{
    let productsUrl = (suffix) => 'products/'+suffix;
    return http.get(productsUrl('all'))
}

export const loadProductsIdentsAction = ()=>{
    let productsUrl = (suffix) => 'products/'+suffix;
    return  http.get(productsUrl('allkeys'))
}
