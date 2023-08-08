import {
  GET_TOUR_GUIDE_BY_ID_GUIDE,
  GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
  GET_GUIDE_LICENSE_BY_ID_GUIDE,
  UPDATE_GUIDE_INFO,
  UPDATE_GUIDE_LANGUAGE,
  UPDATE_GUIDE_AVATAR,
  UPDATE_GUIDE_LICENSE,
  UPDATE_UPLOADED_LICENSE,
  UPDATE_GUIDE_PASSWORD,
  GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
  UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
  GET_GUIDE_TIME_BY_ID_GUIDE,
  UPDATE_GUIDE_TIME_BY_ID_GUIDE,
  GET_GUIDE_BOOKING_BY_ID_GUIDE,
  GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING } 
from "../types";
import { stateDefault } from "../reducers/BasicReducer";

let user_login = stateDefault.user_login

const stateInit = {
    guide_info: user_login,

    guide_language_by_id_guide: [],

    guide_license_by_id_guide: [],

    uploaded_license: [],

    verified: false,

    guide_attraction_by_id_guide: [],

    guide_time_by_id_guide: [],

    guide_booking_by_id_guide: [],

    guide_review_by_id_booking: [],
};

export const FreelancerReducer = (state = stateInit, action) => {
  console.log(action)
    switch (action.type) {
      case GET_TOUR_GUIDE_BY_ID_GUIDE: {
        return { ...state,
                guide_info: action.guide_info };
      }
      case GET_GUIDE_LANGUAGUE_BY_ID_GUIDE: {
        return { ...state,
                guide_language_by_id_guide: action.guide_language_by_id_guide };
      }

      case GET_GUIDE_LICENSE_BY_ID_GUIDE: {
        return {...state, 
               guide_license_by_id_guide: action.guide_license_by_id_guide,
               verified: action.verified };
      }

      case UPDATE_GUIDE_INFO:{
        return {...state, 
          guide_info: action.guide_info}
      }

      case UPDATE_GUIDE_LANGUAGE:{
        return {...state, 
          guide_language_by_id_guide: action.guide_language_by_id_guide}
      }

      case UPDATE_GUIDE_AVATAR:{
        return {...state, 
          tour_guide_by_id_guide: action.tour_guide_by_id_guide} // update avatar
      }

      case UPDATE_GUIDE_LICENSE:{
        return {...state, 
          guide_license_by_id_guide: action.guide_license_by_id_guide, // update license
          verified: action.verified}
      } 
      
      case UPDATE_UPLOADED_LICENSE:{
        return {...state, 
          uploaded_license: action.uploaded_license};
      }  
      
      case UPDATE_GUIDE_PASSWORD:{
        return {...state, 
          tour_guide_by_id_guide: action.tour_guide_by_id_guide} // update password
      }    

      case GET_GUIDE_ATTRACTION_BY_ID_GUIDE: {
        return { ...state,
                guide_attraction_by_id_guide: action.guide_attraction_by_id_guide };
      }

      // how to update photo path TT
      case UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE: {
        return { ...state,
                guide_attraction_by_id_guide: action.guide_attraction_by_id_guide };
      }

      case GET_GUIDE_TIME_BY_ID_GUIDE:{
        return{ ...state,
                guide_time_by_id_guide: action.guide_time_by_id_guide};
      }

      case UPDATE_GUIDE_TIME_BY_ID_GUIDE:{
        return {...state, 
          guide_time_by_id_guide: action.guide_time_by_id_guide}
      }  

      case GET_GUIDE_BOOKING_BY_ID_GUIDE:{
        return {...state, 
          guide_booking_by_id_guide: action.guide_booking_by_id_guide}
      }  

      case GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING:{
        return {...state, 
          guide_review_by_id_booking: action.guide_review_by_id_booking}
      }

      default:
        return { ...state };
    }
  };