import { GET_DESTINATION } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
export const getDestination = () => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        // const result = await FreelancerService.layDanhSachNguoiDung();
        const result = {}
  
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