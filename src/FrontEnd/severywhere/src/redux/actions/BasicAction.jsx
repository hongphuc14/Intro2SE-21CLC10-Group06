import { GET_DESTINATION } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import { BasicService } from "../../services/BasicService";

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