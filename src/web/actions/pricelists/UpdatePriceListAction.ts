import { UPDATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceList } from './Model'

export const updatePriceListAction = (pricelist : any) : Promise<{data : PriceList }>=> {
    let url = (suffix) => 'pricelists/'+suffix;
    return http.post(url('save'),JSON.stringify(pricelist))
}
