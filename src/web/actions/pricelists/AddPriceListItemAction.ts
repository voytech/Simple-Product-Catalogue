import { UPDATE_PRODUCT } from '../../consts/Actions';
import { ActionPayload } from '../utils';
import { StoreUtils } from '../../Store';
import { http } from '../../Config';
import { PriceListItem, PriceAssignement } from './Model';

export const addPriceListItemAction = StoreUtils.createAction((item : PriceAssignement) => {
    return (dispatch) => {
      http.post('pricelists/addItem',JSON.stringify(item))
          .then(response => { console.log('Created new price list item'); console.log(response.data);})
          .catch(error => console.error(error));
    }
});
