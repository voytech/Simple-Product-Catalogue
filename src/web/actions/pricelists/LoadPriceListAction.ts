import { UPDATE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadPriceListAction = StoreUtils.createAction((name:string)=>{
    let url = (suffix) => 'pricelists/'+suffix;
    return (dispatch) => {
      http.get(url('findByNameWithItems?name='+name))
          .then(response => { dispatch({type: UPDATE_PRICELIST, payload:  response.data })})
          .catch(error => console.error(error));
    }
});
