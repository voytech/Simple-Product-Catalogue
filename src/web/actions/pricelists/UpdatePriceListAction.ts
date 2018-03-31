import { UPDATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const updatePriceListAction = StoreUtils.createAction((pricelist : any) => {
    let url = (suffix) => 'pricelists/'+suffix;
    return (dispatch) => {
      http.post(url('save'),JSON.stringify(pricelist))
          .then(response => { dispatch({type: UPDATE_PRICELIST, payload: response.data })})
          .catch(error => console.error(error));
    }
});
