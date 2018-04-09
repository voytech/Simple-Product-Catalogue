import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceListItem, PriceAssignement } from './Model';

export const addPriceListItemAction = (item : PriceAssignement) => {
    return http.post('pricelists/addItem',JSON.stringify(item))
}
