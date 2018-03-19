import { LOGIN } from '../../consts/Actions';

export function loginAction(email:string, password:string){
  let authUrl = (suffix) => 'v1/user/auth/'+suffix;
  return (dispatch) => {
    fetch(authUrl('login'),{
      method: 'post',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({email:email, passwd: password})
    }).then(response =>
              response.json().then((result) =>
                                     dispatch({type: LOGIN, payload: {
                                                                auth: {
                                                                  ... result,
                                                                  state: response.status,                                                                  
                                                                }
                                                              }
                                                            })))
      .catch(error => console.error(error));
  }
}
