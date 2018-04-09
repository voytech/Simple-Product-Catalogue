import { CREATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceList } from './Model'

export const createPriceListAction = (pricelist : PriceList) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return http.post(url('create'),JSON.stringify(pricelist))
              
  }
