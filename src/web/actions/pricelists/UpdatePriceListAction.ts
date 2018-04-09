import { UPDATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const updatePriceListAction = (pricelist : any) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return http.post(url('save'),JSON.stringify(pricelist))
}
