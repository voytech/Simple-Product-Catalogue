import { REMOVE_PRICELIST } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';

export const removePriceListAction = StoreUtils.createAction((priceListName : string,attachmentName : string) => {
    let url = (productName:string) => 'pricelists/'+priceListName;
    return (dispatch) => {
      http.delete(url(priceListName))
          .then(response => { dispatch({type: REMOVE_PRICELIST, payload: response.data })})
          .catch(error => console.error(error));
    }
});
