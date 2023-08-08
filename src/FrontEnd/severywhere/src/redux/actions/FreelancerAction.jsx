import { 
  GET_TOUR_GUIDE_BY_ID_GUIDE,
  GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
  GET_GUIDE_LICENSE_BY_ID_GUIDE,
  UPDATE_GUIDE_INFO,
  UPDATE_GUIDE_LANGUAGE,
  UPDATE_GUIDE_LICENSE,
  UPDATE_UPLOADED_LICENSE,
  UPDATE_GUIDE_PASSWORD,
  GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
  UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
  GET_GUIDE_TIME_BY_ID_GUIDE,
  UPDATE_GUIDE_TIME_BY_ID_GUIDE,
  ADD_GUIDE_TIME_BY_ID_GUIDE,
  DELETE_GUIDE_TIME_BY_ID_GUIDE,
  GET_GUIDE_BOOKING_BY_ID_GUIDE,
  GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING } 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import {freelancerService} from '../../services/FreelancerService';

const result = []

export const getTourGuideByIdGuide = (email) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await freelancerService.getTourGuideByIdGuide(email);
      if (result.status === 200) {
        dispatch({
          type: GET_TOUR_GUIDE_BY_ID_GUIDE,
          guide_info: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }

  //   dispatch({type: GET_TOUR_GUIDE_BY_ID_GUIDE,
  //     tour_guide_by_id_guide: {id_guide: 1,	password: "********",	avatar: "",	fullname: "Tran Tung Lam",	birthday: "1998-12-05",	
  //     gender: 0,	email: "tunglamtran.work@gmail.com", phone: "0865966366",	id_des: 2,
  //     experience: "2 years",	description: "Although I only have 2 years of experience, I am confident that I have the skills to help you have the best trip experience possible.",	
  //     price_per_session: 48.00,	free_cancellation: true,	id_role: 3}})
  }
};

export const getGuideLanguageByIdGuide = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await freelancerService.getGuideLanguageByIdGuide(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
          guide_language_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const getGuideLicenseByIdGuide = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await freelancerService.getGuideLicenseByIdGuide(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_LICENSE_BY_ID_GUIDE,
          guide_license_by_id_guide: result.data.content,
          verified: result.data.content.some((license) => license.status === 2)
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }

    // const res = [{file_path: "a", status: 1}, {file_path: "b", status: 2}, {file_path: "c", status: 3}]

    // dispatch({
    //   type: GET_GUIDE_LICENSE_BY_ID_GUIDE,
    //   guide_license_by_id_guide: res,
    //   verified: res.some((license) => license.status === 2)
    // });
  };
};

export const updateGuideInfo = (id_guide, info) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await freelancerService.updateGuideInfo(id_guide, info);
      // console.log(result);
      if (result.status === 200) {
        dispatch({
          type: UPDATE_GUIDE_INFO,
          guide_info: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
    // dispatch({
    //   type: UPDATE_GUIDE_INFO,
    //   guide_info: info,})
  }
};

export const updateGuideLanguage = (id_guide, lang) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const language = {language: [...lang]}
      const result = await freelancerService.updateGuideLanguage(id_guide, language);
    
      if (result.status === 200) {
        dispatch({
          type: UPDATE_GUIDE_LANGUAGE,
          guide_language_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
    // dispatch({
    //   type: UPDATE_GUIDE_LANGUAGE,
    //   guide_language_by_id_guide: language,})
  }
};

export const updateGuideAvatar = (id_guide, info, preview) => {
  return async (dispatch) => {
    // try {
    //   dispatch(displayLoadingAction);

    //   const result = await freelancerService.updateGuideAvatar(id_guide, preview);

    //   if (result.status === 200) {
    //     dispatch(hideLoadingAction);
    //   }
    // } catch (error) {
    //   console.log("error", error.response);
    // }
    dispatch({
      type: UPDATE_GUIDE_INFO,
      guide_info: {...info, avatar: preview?.name || info.avatar}})
  }
};

export const updateGuideLicense = (id_guide, license, uploaded_license) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_GUIDE_LICENSE,
      guide_license_by_id_guide: license,
      verified: license.some((license) => license.status === 2)})
  }
};

export const updateGuidePassword = (id_guide, info, currentPwd) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_GUIDE_PASSWORD,
      guide_info: info})
  }
};

export const getGuideAttractionByIdGuide = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await freelancerService.getGuideAttractionByIdGuide(id_guide);

      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
          guide_attraction_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
    // dispatch({
    //   type: GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
    //   guide_attraction_by_id_guide: [{id_attraction: 1, photo_path: "logo512.png", title: "Cua Lo Beach", 
    //   content: "This is a pristine beach with a long stretch of white sand that attracts visitors for swimming, sunbathing, and relaxing."},
    //   {id_attraction: 2, photo_path: "", title: "abcd", content: "This is a"},
    //   {id_attraction: 3, photo_path: "", title: "", content: ""}]
    // })
  }
};

export const updateGuideAttractionByIdGuide = (id_guide, attractions) => {
  return async (dispatch) => {
    dispatch({
    type: UPDATE_GUIDE_ATTRACTION_BY_ID_GUIDE,
    guide_attraction_by_id_guide: attractions
    })
  }
};

export const getGuideTimeByIdGuide = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await freelancerService.getGuideTimeByIdGuide(id_guide);

      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_TIME_BY_ID_GUIDE,
          guide_time_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
  // return {
  //   type: GET_GUIDE_TIME_BY_ID_GUIDE,
  //   guide_time_by_id_guide: [{id_guidetime: 1, guide_date: "2023-08-08",guide_session: 1, is_available: true},
  //   {id_guidetime: 2, guide_date: "2023-08-09",guide_session: 2, is_available: true},
  //   {id_guidetime: 3, guide_date: "2023-08-10",guide_session: 3, is_available: true},
  //   {id_guidetime: 4, guide_date: "2023-08-11",guide_session: 1, is_available: true}]
  // }
};

export const deleteGuideTimeByIdGuide = (id_guide, date, session) => {
  // tìm thấy {date, session,id_guide} thì xóa
  // nếu tìm k thấy thì thêm vào
  
  return {
    type: DELETE_GUIDE_TIME_BY_ID_GUIDE,
    guide_time_by_id_guide: result, // data sau khi cập nhật date và session
  }
};

export const addGuideTimeByIdGuide = (id_guide, date, session) => {
  // tìm thấy {date, session,id_guide} thì xóa
  // nếu tìm k thấy thì thêm vào
  return {
    type: ADD_GUIDE_TIME_BY_ID_GUIDE,
    guide_time_by_id_guide: result, // data sau khi cập nhật date và session
  }
};


export const getGuideBookingByIdGuide = (id_guide) => {
  return {
    type: GET_GUIDE_BOOKING_BY_ID_GUIDE,
    guide_booking_by_id_guide: result,
  }
};

export const getGuideReviewByIdGuidebooking = (id_guide) => {
  return {
    type: GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING,
    guide_review_by_id_booking: result
  }
};