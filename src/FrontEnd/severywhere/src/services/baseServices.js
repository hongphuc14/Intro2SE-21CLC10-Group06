import { DOMAIN, TokenKey, RoleKey, RoleMapping } from "../util/config";
import axios from "axios";

export class baseService {
  getUserRole = () =>{
    const roleId = localStorage.getItem(RoleKey);
    return RoleMapping[roleId];
  };

  //add common headers to all requests
  addCommonHeaders = (headers = {}) => {
    const role = this.getUserRole();
    return {
      ...headers,
      TokenByClass: localStorage.getItem(TokenKey),
      Token: localStorage.getItem(TokenKey),
      Role: role, // Add the user role to the request headers
    };
  };

  get = (url, headers = {}) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: this.addCommonHeaders(headers)
    });
  };

  post = (url, model, headers = {}) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: this.addCommonHeaders(headers)
    });
  };

  put = (url, model, headers = {}) => {
    // put json về phía backend
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: this.addCommonHeaders(headers) 
    });
  };

  delete = (url, headers = {}) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: this.addCommonHeaders(headers) // token yêu cầu từ backend chứng minh user đã đăng nhập rồi
    });
  };

  patch = (url, headers = {}) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PATCH",
      headers: this.addCommonHeaders(headers)
    });
  };

  isGuest = () =>{
    const roleId = localStorage.getItem(RoleKey);
    // if roleId is null or undefined, the user is a guest
    return !roleId;
  }
}

// Setup axios interceptor
export const http = axios.create({
  baseURL: DOMAIN, // Domain khi request api sẽ được ghép vào với link
  timeout: 30000, // Thời gian tối đa chờ response trả về
});
