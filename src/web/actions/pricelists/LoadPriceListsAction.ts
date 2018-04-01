import { LOAD_PRICELISTS } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const loadPriceListsAction = StoreUtils.createAction(()=>{
    let url = (suffix) => 'pricelists/'+suffix;
    return (dispatch) => {
      http.get(url('all')).then(response => { console.log(response.data);dispatch({type: LOAD_PRICELISTS, payload: { pricelists: response.data }})})
          .catch(error => console.error(error));
    }
});
