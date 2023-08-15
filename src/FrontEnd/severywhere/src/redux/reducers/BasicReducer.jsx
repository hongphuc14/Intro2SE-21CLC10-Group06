import { USER_LOGIN } from "../../util/config";
import { GET_DESTINATION, LOGIN, SIGNUP } from "../types";

let user_login = {};
if(localStorage.getItem(USER_LOGIN)){
  user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
}
export const stateDefault = {
  user_login: user_login,
  // user_login: { "id_admin":4,
  //               "fullname" :"Ha Cam Ly",
  //               "password":	"$2b$10$2NI.2LOEUwVKg.tK6bYacO3DI8Jz5x8aZ9r7wimFWa2fqKKakec9i",
  //               "email":	"camlyha39@gmail.com",
  //               "phone":	"956365478",
  //               "birthday":	"1999-11-08",
  //               "gender":	1,
  //               "avatar":	"1691747045811_shinchan.jpg",
  //               "id_role":	4 },
  user_signup: {},
  destination: []
};

export const BasicReducer = (state = stateDefault, action) => {
  console.log(action)
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
    default:
      return { ...state };
  }
};