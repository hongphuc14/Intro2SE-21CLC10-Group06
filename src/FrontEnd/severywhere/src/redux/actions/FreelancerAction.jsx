import { GET_TOUR_GUIDE_BY_ID_GUIDE,
    GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
    GET_GUIDE_LICENSE_BY_ID_GUIDE,
    GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
    UPDATE_TOUR_GUIDE_BY_ID_GUIDE } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import {freelancerService} from '../../services/FreelancerService';

export const getTourGuideByIdGude = (email) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await freelancerService.getTourGuideByIdGude(email);
  
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

  export const updateTourGuideByIdGude = (id_guide, info) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await freelancerService.updateTourGuideByIdGude(id_guide, info);
  
        if (result.status === 200) {
          dispatch({
            type: UPDATE_TOUR_GUIDE_BY_ID_GUIDE,
            tour_guide_by_id_guide: result.data,
          });
          alert("Update infomation successfully");
          dispatch(getTourGuideByIdGude(id_guide));
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };