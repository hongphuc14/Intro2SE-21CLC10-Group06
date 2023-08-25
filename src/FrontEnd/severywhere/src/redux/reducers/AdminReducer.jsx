import { GET_ADMIN_INFO_BY_ID_ADMIN, UPDATE_ADMIN_INFO, UPDATE_ADMIN_PWD, UPDATE_SELECTED_MENU_ITEM,
        UPLOAD_ADMIN_AVATAR, GET_AVATAR, GET_ARR_FREELANCER_LICENSE, GET_ARR_COMPANY_LICENSE,
        GET_COMPANY_LICENSE, GET_FREELANCER_LICENSE, GET_ARR_COMPANY_BOOKING, GET_ARR_FREELANCER_BOOKING, 
        GET_ARR_TOURIST, GET_ARR_FREELANCER, GET_ARR_COMPANY, GET_ARR_GUIDE_REVIEW, GET_ARR_TOUR_REVIEW,
        GET_ARR_GUIDE_REPORT, GET_ARR_TOUR_REPORT, UPDATE_SELECTED_SUB_MENU_ITEM, GET_TOURIST_INFO_BY_ID_TOURIST,
        GET_TOURIST_GUIDE_BOOKING, GET_TOURIST_TOUR_BOOKING, GET_COMPANY_INFO_BY_ID_COMPANY, GET_COMPANY_TOUR_BY_ID_COMPANY,
        GET_COMPANY_LICENSES_BY_ID_COMPANY, GET_FREELANCER_INFO_BY_ID_GUIDE, GET_FREELANCER_ATTRACTION_BY_ID_GUIDE,
        GET_FREELANCER_LICENSES_BY_ID_GUIDE, GET_FREELANCER_TIME_BY_ID_GUIDE, GET_FREELANCER_LANGUAGE,
        GET_ARR_TOUR } from "../types";
import { stateDefault} from "../reducers/BasicReducer";
import { adminService } from "../../services/AdminService";

let user_login = stateDefault.user_login;

let avatar_path = "";
if(!user_login.avatar){
  avatar_path = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
}
else{
  const url = await adminService.getAdminAvatar(user_login.id_admin);
  avatar_path = url.data;
}

const stateInit = {
    admin_info: user_login,
    admin_avatar:  avatar_path,
    selectedMenuItem: '',
    selectedSubMenuItem: '',
    arr_freelancer_license: [],
    arr_company_license: [],
    freelancer_license: '',
    company_license: '',
    arr_guide_booking: [],
    arr_tour_booking: [],
    arr_tourist: [],
    arr_company: [],
    arr_freelancer: [],
    arr_tour_review: [],
    arr_guide_review: [],
    arr_tour_report: [],
    arr_guide_report: [],
    tourist_info: {},
    tourist_guide_booking: [],
    tourist_tour_booking: [],
    company_info: [],
    company_tour: [],
    company_licenses: [],
    freelancer_info: [],
    freelancer_attraction: [],
    freelancer_licenses: [],
    freelancer_time: [],
    freelancer_language: [],
    arr_tour: [],

};

export const AdminReducer = (state = stateInit, action) => {
  //console.log("state: ", state);
  switch (action.type) {
    case GET_ADMIN_INFO_BY_ID_ADMIN: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPDATE_ADMIN_INFO: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPDATE_ADMIN_PWD: {
      return { ...state, admin_info: action.admin_info };
    }
    case UPLOAD_ADMIN_AVATAR: {
      return { ...state, admin_info: action.admin_info };
    }
    case GET_AVATAR:{
      return { ...state, admin_avatar: action.admin_avatar };
    }
    case UPDATE_SELECTED_MENU_ITEM:{
      return { ...state, selectedMenuItem: action.payload};
    }
    case UPDATE_SELECTED_SUB_MENU_ITEM:{
      return { ...state, selectedSubMenuItem: action.payload};
    }
    case GET_ARR_FREELANCER_LICENSE:{
      return { ...state, arr_freelancer_license: action.arr_freelancer_license };
    }
    case GET_ARR_COMPANY_LICENSE:{
      return { ...state, arr_company_license: action.arr_company_license };
    }
    case GET_FREELANCER_LICENSE:{
      return { ...state, freelancer_license: action.freelancer_license };
    }
    case GET_COMPANY_LICENSE:{
      return { ...state, company_license: action.company_license };
    }
    case GET_ARR_FREELANCER_BOOKING:{
      return { ...state, arr_guide_booking: action.arr_guide_booking };
    }
    case GET_ARR_COMPANY_BOOKING:{
      return { ...state, arr_tour_booking: action.arr_tour_booking };
    }
    case GET_ARR_TOURIST:{
      return { ...state, arr_tourist: action.arr_tourist };
    }
    case GET_ARR_FREELANCER:{
      return { ...state, arr_freelancer: action.arr_freelancer };
    }
    case GET_ARR_COMPANY:{
      return { ...state, arr_company: action.arr_company };
    }
    case GET_ARR_GUIDE_REVIEW:{
      return { ...state, arr_guide_review: action.arr_guide_review};
    }
    case GET_ARR_TOUR_REVIEW:{
      return { ...state, arr_tour_review: action.arr_tour_review};
    }
    case GET_ARR_GUIDE_REPORT:{
      return { ...state, arr_guide_report: action.arr_guide_report};
    }
    case GET_ARR_TOUR_REPORT:{
      return { ...state, arr_tour_report: action.arr_tour_report};
    }
    case GET_TOURIST_INFO_BY_ID_TOURIST: {
      return { ...state, tourist_info: action.tourist_info };
    }
    case GET_TOURIST_GUIDE_BOOKING:{
      return { ...state, tourist_guide_booking: action.tourist_guide_booking };
    }
    case GET_TOURIST_TOUR_BOOKING:{
      return { ...state, tourist_tour_booking: action.tourist_tour_booking };
    }
    case GET_COMPANY_INFO_BY_ID_COMPANY: {
      return { ...state, company_info: action.company_info };
    }
    case GET_COMPANY_TOUR_BY_ID_COMPANY:{
      return { ...state, company_tour: action.company_tour };
    }
    case GET_COMPANY_LICENSES_BY_ID_COMPANY:{
      return { ...state, company_licenses: action.company_licenses };
    }
    case GET_FREELANCER_INFO_BY_ID_GUIDE: {
      return { ...state, freelancer_info: action.freelancer_info };
    }
    case GET_FREELANCER_ATTRACTION_BY_ID_GUIDE:{
      return { ...state, freelancer_attraction: action.freelancer_attraction };
    }
    case GET_FREELANCER_LICENSES_BY_ID_GUIDE:{
      return { ...state, freelancer_licenses: action.freelancer_licenses };
    }
    case GET_FREELANCER_TIME_BY_ID_GUIDE:{
      return { ...state, freelancer_time: action.freelancer_time };
    }
    case GET_FREELANCER_LANGUAGE:{
      return { ...state, freelancer_language: action.freelancer_language };
    }
    case GET_ARR_TOUR:{
      return { ...state, arr_tour: action.arr_tour};
    }
    default:
      return { ...state };
  }
};