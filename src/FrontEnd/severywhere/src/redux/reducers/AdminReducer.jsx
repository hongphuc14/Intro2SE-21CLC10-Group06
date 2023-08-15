import { GET_ADMIN_INFO_BY_ID_ADMIN, UPDATE_ADMIN_INFO, UPDATE_ADMIN_PWD, UPLOAD_ADMIN_AVATAR, GET_AVATAR } from "../types";
import { stateDefault} from "../reducers/BasicReducer";
import { adminService } from "../../services/AdminService";
let user_login = stateDefault.user_login;
let avatar_path = "";
if(!user_login.avatar){
  avatar_path = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
}
else{
  const url = await adminService.getAdminAvatar(user_login.id_admin);
  avatar_path = url.data;
}
const stateInit = {
    admin_info: user_login,
    admin_avatar:  avatar_path
};

export const AdminReducer = (state = stateInit, action) => {
  console.log("state: ", state);
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
    case GET_AVATAR:{
      return { ...state, admin_avatar: action.admin_avatar };
    }
    default:
      return { ...state };
  }
};