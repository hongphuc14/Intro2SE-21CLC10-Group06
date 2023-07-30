import { GET_TOUR_GUIDE_BY_ID_GUIDE,
        GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
        GET_GUIDE_LICENSE_BY_ID_GUIDE,
        GET_GUIDE_ATTRACTION_BY_ID_GUIDE } 
from "../types";

// let user = {}
const stateDefault = {
    tour_guide_by_id_guide: 
    {id_guide: 1,	password: "tunglam23@@",	avatar: "",	fullname: "Tran Tung Lam",	birthday: "1998-12-05",	
    gender: 0,	email: "tunglamtran.work@gmail.com", phone: "0865966366",	id_des: 2,
    experience: "2 years",	description: "Although I only have 2 years of experience, I am confident that I have the skills to help you have the best trip experience possible.",	
    price_per_session: 48.00,	free_cancellation: true,	id_role: 3},

    guide_language_by_id_guide: {id_lang: [1,2]},

    guide_license_by_id_guide: [],

    verified: false,

    guide_attraction_by_id_guide: [],
};

export const FreelancerReducer = (state = stateDefault, action) => {
    switch (action.type) {
      case GET_TOUR_GUIDE_BY_ID_GUIDE: {
        state.tour_guide_by_id_guide = action.tour_guide_by_id_guide;
        return { ...state };
      }

      case GET_GUIDE_LANGUAGUE_BY_ID_GUIDE: {
        state.guide_language_by_id_guide = action.guide_language_by_id_guide;
        return { ...state };
      }

      case GET_GUIDE_LICENSE_BY_ID_GUIDE: {
        // state.guide_license_by_id_guide = action.guide_license_by_id_guide;
        // return { ...state };

        return {...state, 
               guide_license_by_id_guide: action.guide_license_by_id_guide,
               verified: action.guide_license_by_id_guide.some((license) => license.status === 2)}

      }

      // case GET_VERIFIED:{
      //   state.guide_license_by_id_guide = action.guide_license_by_id_guide;
      //   return { ...state };
      // }

      case GET_GUIDE_ATTRACTION_BY_ID_GUIDE: {
        state.guide_attraction_by_id_guide = action.guide_attraction_by_id_guide;
        return { ...state };
      }

      default:
        return { ...state };
    }
  };