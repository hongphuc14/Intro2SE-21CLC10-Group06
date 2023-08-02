import { GET_TOUR_GUIDE_BY_ID_GUIDE,
  GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
  GET_GUIDE_LICENSE_BY_ID_GUIDE,
  UPDATE_TOUR_GUIDE_BY_ID_GUIDE,
  GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
  UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
  GET_GUIDE_TIME_BY_ID_GUIDE } 
from "../types";

// let user = {}
const stateDefault = {
    tour_guide_by_id_guide: {id_guide: 1,	password: "********",	avatar: "",	fullname: "Tran Tung Lam",	birthday: "1998-12-05",	
    gender: 0,	email: "tunglamtran.work@gmail.com", phone: "0865966366",	id_des: 2,
    experience: "2 years",	description: "Although I only have 2 years of experience, I am confident that I have the skills to help you have the best trip experience possible.",	
    price_per_session: 48.00,	free_cancellation: true,	id_role: 3},

    guide_language_by_id_guide: [1,2],

    guide_license_by_id_guide: [{file_path: "a", status: 1}, {file_path: "b", status: 2}, {file_path: "c", status: 3}],

    verified: true,

    guide_attraction_by_id_guide: [{id_attraction: 1, photo_path: "a", title: "Cua Lo Beach", 
    description: "This is a pristine beach with a long stretch of white sand that attracts visitors for swimming, sunbathing, and relaxing."},
    {id_attraction: 2, photo_path: "a", title: "abc", description: "This is a"}],

    guide_time_by_id_guide: [{id_guidetime: 1, guide_date: "2023-08-01",guide_session: 1, is_available: true},
                            {id_guidetime: 2, guide_date: "2023-08-02",guide_session: 2, is_available: true},
                            {id_guidetime: 3, guide_date: "2023-08-03",guide_session: 3, is_available: true},
                            {id_guidetime: 4, guide_date: "2023-08-04",guide_session: 1, is_available: true}]
};

export const FreelancerReducer = (state = stateDefault, action) => {
    switch (action.type) {
      case GET_TOUR_GUIDE_BY_ID_GUIDE: {
        return { ...state,
                tour_guide_by_id_guide: action.tour_guide_by_id_guide };
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

      case UPDATE_TOUR_GUIDE_BY_ID_GUIDE:{
        return {...state, 
          tour_guide_by_id_guide: action.tour_guide_by_id_guide,
          guide_language_by_id_guide : action.guide_language_by_id_guide,
          guide_license_by_id_guide: action.guide_license_by_id_guide,
          verified: action.verified}
      }

      case GET_GUIDE_ATTRACTION_BY_ID_GUIDE: {
        return { ...state,
                guide_attraction_by_id_guide: action.guide_attraction_by_id_guide };
      }

      case UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE: {
        return { ...state,
                guide_attraction_by_id_guide: action.guide_attraction_by_id_guide };
      }

      case GET_GUIDE_TIME_BY_ID_GUIDE:{
        return{ ...state,
                guide_time_by_id_guide: action.guide_time_by_id_guide};
      }

      default:
        return { ...state };
    }
  };