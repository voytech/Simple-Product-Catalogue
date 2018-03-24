import { REGISTER } from '../../consts/Actions';
import { StoreUtils } from '../../Store'
import { http } from '../../Config';

export const registerAction = StoreUtils.createAction((username:string, email:string, password:string)=>{
    let authUrl = (suffix) => 'user/auth/'+suffix;
    return (dispatch) => {
      http.post(authUrl('register'),JSON.stringify({name: username, password: password, email: email}))
          .then(response => dispatch({type: REGISTER, payload: {auth: response.data}}));
    }
}); 
