import { CREATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const createPriceListAction = StoreUtils.createAction((pricelist : any) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return (dispatch) => {
      http.post(url('create'),JSON.stringify(pricelist))
          .then(response => { dispatch({type: CREATE_PRICELIST, payload: response.data })})
          .catch(error => console.error(error));
    }
  });
