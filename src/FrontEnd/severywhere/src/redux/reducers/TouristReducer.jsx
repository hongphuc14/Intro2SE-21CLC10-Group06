import { GET_TOURIST_INFO, 
  GET_TOUR_SEARCH,
  GET_GUIDE_SEARCH,
  UPDATE_TOURIST_CART,
  GET_TOUR_BOOKING,
  GET_GUIDE_BOOKING } 
from "../types";

const stateDefault = {
    // lưu thông tin của tourist
    // password chỉ lưu chuỗi '**********'
    tourist_info: {},

    // lưu wishlist, recent, review
    tour_wishlist: [],
    guide_wishlist: [],
    tour_recent: [],
    guide_recent: [],
    tour_review: [],
    guide_review: [],
    guide_history: [],

    // seach
    tour_search: [],
    guide_search: [],

    // array các booking
    tour_booking: [],
    guide_booking: []
};

export const TouristReducer = (state = stateDefault, action) => {
switch (action.type) {
    case GET_TOURIST_INFO:{
      return {...state, tourist_info: action.tourist_info}
    }
    case GET_TOUR_SEARCH: {
      return { ...state, tour_search: action.tour_search };
    }
    case GET_GUIDE_SEARCH:{
      return {...state, guide_search: action.guide_search}
    }
    case UPDATE_TOURIST_CART: {
      return { ...state, tourist_cart: action.tourist_cart };
    }
    case GET_TOUR_BOOKING: {
      return { ...state, tour_booking: action.tour_booking };
    }
    case GET_GUIDE_BOOKING: {
      return { ...state, guide_booking: action.guide_booking };
    }
  default:
    return { ...state };
}
};