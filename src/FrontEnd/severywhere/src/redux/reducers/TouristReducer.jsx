import { GET_TOURIST_INFO, 
    GET_TOUR_SEARCH,
    GET_GUIDE_SEARCH,
    UPDATE_TOURIST_CART,
    GET_TOURIST_BOOKING } 
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
  
      // array các tour được bỏ vào giỏ hàng
      tourist_cart: [],
  
      // array các booking
      tourist_booking: []
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
      case GET_TOURIST_BOOKING: {
        return { ...state, tourist_booking: action.tourist_booking };
      }
    default:
      return { ...state };
  }
  };