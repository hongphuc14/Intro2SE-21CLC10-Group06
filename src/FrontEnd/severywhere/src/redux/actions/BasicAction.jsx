import { GET_DESTINATION, LOGIN, LOGOUT, SIGNUP, UPLOAD_ADMIN_AVATAR, UPDATE_SELECTED_MENU_ITEM } from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import { basicService } from "../../services/basicService";
import { history } from "../../App";
import { USER_LOGIN, TokenKey, RoleKey } from "../../util/config";

export const logInAction = (user_login) => {
  return async (dispatch) => {
    try {
      const result = await basicService.logIn(user_login);
      console.log("result action: ", result);
      if (result.status === 200) {
        // Store token in localStorage
        localStorage.setItem(TokenKey, result.data.content);
        const userResult = await basicService.getInfoByEmail(user_login.email);
        if (result.status === 200) {
          dispatch({
            type: LOGIN,
            user_login: userResult.data.content
          });
        }
        // Store user information and id_role in localStorage
        localStorage.setItem(USER_LOGIN, JSON.stringify(userResult.data.content));
        localStorage.setItem(RoleKey, JSON.stringify(userResult.data.content.id_role));

        const roleId = localStorage.getItem(RoleKey);
        if(roleId === '1')
          history.push("/homepage");
        if(roleId === '2')
          history.push("/profile-company");
        if(roleId === '3')
          history.push("/profile-freelancer");
        if(roleId === '4')
          history.push("/profile-admin");
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const getDestination = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await basicService.getDestination();
  
      if (result.status === 200) {
        dispatch({
          type: GET_DESTINATION,
          destination: result.data,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const signUpAction = (formData) => {
  return async (dispatch) =>{
    try {
      const result = await basicService.signUp(formData);
      if (result.status === 200){
        dispatch({
          type: SIGNUP,
          formData: result.data.content
        });
        
        history.push("/login");
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const deleteAccountAction = (id_role, id) => {
  return async (dispatch) =>{
    try {
        const result = await basicService.deleteAccount(id_role, id);
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const logOutAction = () => {
  return async (dispatch) =>{
    try {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TokenKey);
      localStorage.removeItem(RoleKey);
      dispatch({
        type: LOGOUT,
        user_login: ""
      });
      history.push("/login");
      window.location.reload();
    } catch (error) {
      console.log("error", error.response);
    }
  };
};