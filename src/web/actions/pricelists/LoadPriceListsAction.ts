import { LOAD_PRICELISTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadPriceListsAction = ()=>{
    let url = (suffix) => 'pricelists/'+suffix;
    return http.get(url('all'))
}
