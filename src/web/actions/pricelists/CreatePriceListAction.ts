import { CREATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceList } from './Model'

export const createPriceListAction = StoreUtils.createAction((pricelist : PriceList) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return (dispatch) => {
      http.post(url('create'),JSON.stringify(pricelist))
          .then(response => { dispatch({type: CREATE_PRICELIST, payload: response.data })})
          .catch(error => console.error(error));
    }
  });
