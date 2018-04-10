import { UPDATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceList } from './Model'

export const loadPriceListAction = (name:string) : Promise<{data : PriceList }>=>{
    let url = (suffix) => 'pricelists/'+suffix;
    return http.get(url('findByNameWithItems?name='+name))
}
