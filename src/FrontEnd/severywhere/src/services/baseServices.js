import { DOMAIN, TokenKey } from "../util/config";
import axios from "axios";

export class baseService {
  put = (url, model) => {
    // put json về phía backend
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: { // JWT
        TokenByClass: localStorage.getItem(TokenKey), 
        Token: localStorage.getItem(TokenKey) 
      }, 
    });
  };

  post = (url, model, headers = {}) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        ...headers,
        TokenByClass: localStorage.getItem(TokenKey),
        Token: localStorage.getItem(TokenKey),
      }, 
    });
  };

  get = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { 
        TokenByClass: localStorage.getItem(TokenKey), 
        Token: localStorage.getItem(TokenKey) }, // token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  delete = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: { 
        TokenByClass: localStorage.getItem(TokenKey), 
        Token: localStorage.getItem(TokenKey) }, // token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  patch = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PATCH",
      headers: { 
        TokenByClass: localStorage.getItem(TokenKey), 
        Token: localStorage.getItem(TokenKey) },
    });
  };
}

// Setup axios interceptor
export const http = axios.create({
  baseURL: DOMAIN, // Domain khi request api sẽ được ghép vào với link
  timeout: 30000, // Thời gian tối đa chờ response trả về
});