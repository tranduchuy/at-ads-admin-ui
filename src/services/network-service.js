import axios from 'axios';
import { UNAUTH_USER } from '../actions/types';

export default {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        //catches if the session ended!
        if ( error.response.status === 401 && store.users.isLogout === false) {
            store.dispatch({ type: UNAUTH_USER });
        }
        
        return error;
    });

  }
};