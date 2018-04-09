import { REMOVE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePriceListAction =  (priceListName : string,attachmentName : string) => {
    let url = (productName:string) => 'pricelists/'+priceListName;
    return http.delete(url(priceListName))
}
