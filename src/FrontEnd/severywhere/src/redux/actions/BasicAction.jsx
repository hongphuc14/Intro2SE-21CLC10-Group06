import { GET_DESTINATION, LOGIN } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import { BasicService } from "../../services/BasicService";

const user_login = {email: "", password: ""}

export const logIn = (user_login) => {
  return async (dispatch) => {
    try {
      const result = await BasicService.logIn(user_login);
      if (result.status === 200) {
        await dispatch({
          type: LOGIN,
          user_login: result.data,
        });

        // Thông báo đăng nhập thành công và quay về trang chủ
        alert("Logged in successfully");
        history.push("/profile-freelancer");
        // window.location.reload();
      }
    } catch (error) {
      alert("Login failed, username or password is incorrect");
      console.log("error", error.response);
    }
  };
};

export const getDestination = () => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await BasicService.getDestination();
  
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