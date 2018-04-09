import { LOAD_PRODUCTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadProductsPageAction = (offset,pageSize) => {
    let productsUrl = (suffix) => 'products/'+suffix;
    return http.get(productsUrl('pageWithTotal?offset='+offset+'&size='+pageSize))
}
