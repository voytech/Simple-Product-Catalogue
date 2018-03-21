import { LOGOUT } from '../../consts/Actions';
import { StoreUtils } from '../../Store'

export const logoutAction =  StoreUtils.createAction(() => {
    return {
      type: LOGOUT,
      payload: {
        auth: undefined
      }
    }
  });
