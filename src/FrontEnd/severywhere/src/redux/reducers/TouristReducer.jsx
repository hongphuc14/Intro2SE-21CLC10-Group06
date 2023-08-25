// import { GET_TOURIST_INFO, GET_TOUR_SEARCH, GET_GUIDE_SEARCH, UPDATE_TOURIST_CART, GET_TOURIST_BOOKING } from "../types";
// import { stateDefault } from "./BasicReducer";  
// import { touristService }from "../../services/TouristService";

// let user_login = stateDefault.user_login;
// let avatar_path = "";
// if(!user_login.avatar){
//   avatar_path = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
// }
// else{
//   const url = await touristService.getAdminAvatar(user_login.id_admin);
//   avatar_path = url.data;
// }
//   const stateInit = {
//       // lưu thông tin của tourist
//       // password chỉ lưu chuỗi '**********'
//       tourist_info: {},
  
//       // lưu wishlist, recent, review
//       tour_wishlist: [],
//       guide_wishlist: [],
//       tour_recent: [],
//       guide_recent: [],
//       tour_review: [],
//       guide_review: [],
//       guide_history: [],
  
//       // seach
//       tour_search: [],
//       guide_search: [],
  
//       // array các tour được bỏ vào giỏ hàng
//       tourist_cart: [],
  
//       // array các booking
//       tourist_booking: []
//   };
  
//   export const TouristReducer = (state = stateDefault, action) => {
//   switch (action.type) {
//       case GET_TOURIST_INFO:{
//         return {...state, tourist_info: action.tourist_info}
//       }
//       case GET_TOUR_SEARCH: {
//         return { ...state, tour_search: action.tour_search };
//       }
//       case GET_GUIDE_SEARCH:{
//         return {...state, guide_search: action.guide_search}
//       }
//       case UPDATE_TOURIST_CART: {
//         return { ...state, tourist_cart: action.tourist_cart };
//       }
//       case GET_TOURIST_BOOKING: {
//         return { ...state, tourist_booking: action.tourist_booking };
//       }
//     default:
//       return { ...state };
//   }
//   };