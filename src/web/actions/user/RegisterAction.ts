import { REGISTER } from '../../consts/Actions';
import { StoreUtils } from '../../Store'

export const registerAction = StoreUtils.createActions({registerAction: (username:string, email:string, password:string)=>{
    let authUrl = (suffix) => 'v1/user/auth/'+suffix;
    return (dispatch) => {
      fetch(authUrl('register'),{
        method: 'post',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({name: username, password: password, email: email})
      }).then(response =>
                response.json().then((result) =>
                                       dispatch({type: REGISTER, payload: {auth: result}})))

    }
  }}).registerAction;
