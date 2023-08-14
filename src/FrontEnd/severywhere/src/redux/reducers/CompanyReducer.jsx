import { GET_COMPANY_INFO, 
  GET_GOMPANY_LICENSE,
  UPDATE_COMPANY_INFO,
  UPDATE_COMPANY_LICENSE,
  GET_TOUR_BY_ID_COMPANY,
  GET_COMPANY_BOOKING,
  GET_COMPANY_REVIEW} 
from "../types";

export const stateDefault = {
  company_info: {},
  company_license: [],
  verified: null,
  company_tour: [],
  company_booking: [],
  company_review: [],
};

export const CompanyReducer = (state = stateDefault, action) => {
switch (action.type) {
    case GET_COMPANY_INFO:{
      return {...state, 
        company_info: action.company_info}
    }
    case GET_GOMPANY_LICENSE: {
      return { ...state, 
        company_license: action.company_license,
        verified: action.verified};
    }
    case GET_TOUR_BY_ID_COMPANY:{
      return {...state, 
        company_tour: action.company_tour}
    }
    case UPDATE_COMPANY_INFO: {
      return { ...state, 
        company_info: action.company_info };
    }
    case UPDATE_COMPANY_LICENSE: {
      return { ...state, 
        company_license: action.company_license };
    }
    case GET_COMPANY_BOOKING: {
      return { ...state, 
        company_booking: action.company_booking};
    }
    case GET_COMPANY_REVIEW:{
      return {...state, 
        company_review: action.company_review}
    }
  default:
    return { ...state };
}
};