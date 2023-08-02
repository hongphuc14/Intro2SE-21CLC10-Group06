import { GET_TOUR_GUIDE_BY_ID_GUIDE,
    GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
    GET_GUIDE_LICENSE_BY_ID_GUIDE,
    UPDATE_TOUR_GUIDE_BY_ID_GUIDE,
    GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
    UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
    GET_GUIDE_TIME_BY_ID_GUIDE } 
from "../types";
// import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
// import {freelancerService} from '../../services/FreelancerService';

const result = [{file_path: "a", status: 1}, {file_path: "b", status: 2}, {file_path: "c", status: 3}]

export const getTourGuideByIdGuide = (email) => {
  return {
    type: GET_TOUR_GUIDE_BY_ID_GUIDE,
    tour_guide_by_id_guide: {id_guide: 1,	password: "********",	avatar: "",	fullname: "Tran Tung Lam",	birthday: "1998-12-05",	
    gender: 0,	email: "tunglamtran.work@gmail.com", phone: "0865966366",	id_des: 2,
    experience: "2 years",	description: "Although I only have 2 years of experience, I am confident that I have the skills to help you have the best trip experience possible.",	
    price_per_session: 48.00,	free_cancellation: true,	id_role: 3},
  }
};

export const getGuideLanguageByIdGuide = (id_guide) => {
  return{
    type: GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
    guide_language_by_id_guide: [1,2],
  }
};

export const getGuideLicenseByIdGuide = (id_guide) => {
  return{
    type: GET_GUIDE_LICENSE_BY_ID_GUIDE,
    guide_license_by_id_guide: result,
    verified: result.some((license) => license.status === 2)
  }
};

export const updateTourGuideByIdGuide = (id_guide, info, language, license) => {
  return {
    type: UPDATE_TOUR_GUIDE_BY_ID_GUIDE,
    tour_guide_by_id_guide: info,
    guide_language_by_id_guide: language,
    guide_license_by_id_guide: license,
    verified: license.some((license) => license.status === 2)
  }
};

export const getGuideAttractionByIdGuide = (id_guide) => {
  return {
    type: GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
    guide_attraction_by_id_guide: [{id_attraction: 1, photo_path: "a", title: "Cua Lo Beach", 
                                    description: "This is a pristine beach with a long stretch of white sand that attracts visitors for swimming, sunbathing, and relaxing."}]
  }
};

export const updateGuideAttractionByIdGuide = (id_guide, attraction) => {
  return {
    type: UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
    guide_attraction_by_id_guide: attraction
  }
};

export const getGuideTimeByIdGuide = (id_guide) => {
  return {
    type: GET_GUIDE_TIME_BY_ID_GUIDE,
    guide_time_by_id_guide: []
  }
};

