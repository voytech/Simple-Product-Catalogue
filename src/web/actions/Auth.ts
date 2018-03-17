import { LOGIN, REGISTER } from '../consts/actions'

export class Auth {

  private static authUrl = (suffix) => 'v1/user/auth/'+suffix;

  static loginAction(email:string, password:string){
    return (dispatch) => {
      fetch(Auth.authUrl('login'),{
        method: 'post',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({email:email, passwd: password})
      }).then(response =>
                response.json().then((result) =>
                                       dispatch({type: LOGIN, payload: {auth: {token: result.token}}})))
        .catch(error => console.error(error));
    }
  }

  static registerAction(username:string, email:string, password:string){
    return (dispatch) => {
      fetch(Auth.authUrl('register'),{
        method: 'post',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({name: username, password: password, email: email})
      }).then(response =>
                response.json().then((result) =>
                                       dispatch({type: REGISTER, payload: {auth: result}})))

    }
  }

}
