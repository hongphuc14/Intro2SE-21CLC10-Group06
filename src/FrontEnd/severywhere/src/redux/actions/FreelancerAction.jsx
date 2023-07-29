import { GET_TOUR_GUIDE_BY_ID_GUIDE,
    GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
    GET_GUIDE_LICENSE_BY_ID_GUIDE,
    GET_GUIDE_ATTRACTION_BY_ID_GUIDE } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import {FreelancerService} from '../services/FreelancerService';

export const getTourGuideByIdGude = (id_guide) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await FreelancerService.getTourGuideByIdGude(id_guide);
  
        if (result.status === 200) {
          dispatch({
            type: GET_TOUR_GUIDE_BY_ID_GUIDE,
            tour_guide_by_id_guide: result.data,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };