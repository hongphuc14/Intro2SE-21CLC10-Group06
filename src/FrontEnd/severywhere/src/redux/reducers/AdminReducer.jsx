import { GET_ADMIN_INFO_BY_ID_ADMIN, UPDATE_ADMIN_INFO, UPDATE_ADMIN_PWD, UPLOAD_ADMIN_AVATAR, GET_AVATAR } from "../types";
import { stateDefault} from "../reducers/BasicReducer";

let user_login = stateDefault.user_login;
const stateInit = {
    admin_info: user_login,

};
console.log("AdminReducer admin_info: ", stateInit.admin_info);
export const AdminReducer = (state = stateInit, action) => {
  switch (action.type) {
    case GET_ADMIN_INFO_BY_ID_ADMIN: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPDATE_ADMIN_INFO: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPDATE_ADMIN_PWD: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPLOAD_ADMIN_AVATAR: {
      return { ...state, admin_info: action.admin_info };
    }
    
    default:
      return { ...state };
  }
};