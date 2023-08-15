import { USER_LOGIN } from "../../util/config";
import { GET_DESTINATION, LOGIN, SIGNUP, LOGOUT } from "../types";

let user_login = {};
if(localStorage.getItem(USER_LOGIN)){
  user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
}
export const stateDefault = {
  user_login: user_login,
  user_signup: {},
  destination: []
};

export const BasicReducer = (state = stateDefault, action) => {
switch (action.type) {
  case LOGIN:{
    return { ...state, user_login: action.user_login };
  }
  case GET_DESTINATION: {
    return { ...state, destination: action.destination };
  }
  case SIGNUP:{
    return { ...state, user_signup: action.formData };
  }
  case LOGOUT:{
    return { ...state, user_login: action.user_login};
  }
  default:
    return { ...state };
}
};