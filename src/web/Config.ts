import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { StoreUtils } from './Store'
// Build the middleware for intercepting and dispatching navigation actions
export const http = axios.create({
 baseURL: 'http://localhost:3500/v1/',
 timeout: 3000,
 headers: { "Content-Type": "application/json" }
})

http.interceptors.request.use(function (config) {
    if (StoreUtils.isAuthenticated()){
      config.headers.common['Authorization'] = 'Bearer '+ StoreUtils.getAuthToken();
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
