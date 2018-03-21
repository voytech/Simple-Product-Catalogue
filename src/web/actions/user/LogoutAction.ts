import { LOGOUT } from '../../consts/Actions';
import { StoreUtils } from '../../Store'

export const logoutAction =  StoreUtils.createActions({logoutAction: ()=>{
    return {
      type: LOGOUT,
      payload: {
        auth: undefined
      }
  }}}).logoutAction;
