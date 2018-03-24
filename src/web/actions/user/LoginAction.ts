import { LOGIN } from '../../consts/Actions';
import { StoreUtils } from '../../Store'
import { http } from '../../Config';

export const loginAction =  StoreUtils.createAction((email:string, password:string) => {
    let authUrl = (suffix) => 'user/auth/'+suffix;
    return (dispatch) => {
      http.post(authUrl('login'),JSON.stringify({email:email, passwd: password}))
          .then(response => { http.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
                              dispatch({type: LOGIN,
                                        payload: {
                                                  auth: {
                                                    ... response.data,
                                                    state: response.status,
                                                  }
                                        }})})
        .catch(error => console.error(error));
    }
  });
