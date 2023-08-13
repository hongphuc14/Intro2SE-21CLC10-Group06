import { 
  GET_TOUR_GUIDE_BY_ID_GUIDE,
  GET_GUIDE_LANGUAGUE_BY_ID_GUIDE,
  GET_GUIDE_LICENSE_BY_ID_GUIDE,
  UPDATE_GUIDE_INFO,
  UPDATE_GUIDE_LANGUAGE,
  UPDATE_GUIDE_LICENSE,
  GET_GUIDE_ATTRACTION_BY_ID_GUIDE,
  GET_GUIDE_TIME_BY_ID_GUIDE,
  UPDATE_GUIDE_TIME_BY_ID_GUIDE,
  GET_GUIDE_BOOKING_BY_ID_GUIDE,
  GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING,
} 
from "../types";
import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import {freelancerService} from '../../services/FreelancerService';

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

export const updateGuideAvatar = (id_guide, preview) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      if (preview === "delete"){
        const result = await freelancerService.deleteGuideAvatar(id_guide);
        if (result.status === 200) {
          dispatch({
            type: UPDATE_GUIDE_INFO,
            guide_info: result.data.content})
          dispatch(hideLoadingAction);
        }
      }
      else{
        const formData = new FormData();
        formData.append('file', preview);
        console.log(formData)
        const result = await freelancerService.updateGuideAvatar(id_guide, formData);
        if (result.status === 200) {
          dispatch({
            type: UPDATE_GUIDE_INFO,
            guide_info: result.data.content})
          dispatch(hideLoadingAction);
        }
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};

export const updateGuideLicense = (id_guide, license) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const formData = new FormData();
      for (const item of license) {
        if (item.file)
          formData.append("file", item.file);
        }

      const tmp = []
      for (const item of license) {
        if (!item.file)
          tmp.push(item)
      }

      const obj = {license: [...tmp]}

      // console.log(license, tmp)

      await freelancerService.deleteGuideLicense(id_guide, obj);

      const result = await freelancerService.updateGuideLicense(id_guide, formData);
      if (result.status === 200) {
        console.log(result);
        dispatch({
          type: UPDATE_GUIDE_LICENSE,
          guide_license_by_id_guide: result.data.content,
          verified: license.some((license) => license.status === 2)})
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
  // return async (dispatch) => {
  //   dispatch({
  //     type: UPDATE_GUIDE_LICENSE,
  //     guide_license_by_id_guide: license,
  //     verified: license.some((license) => license.status === 2)})
  // }
};

export const updateGuidePassword = (id_guide, currentPass, newPass) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {c_password: currentPass, n_password: newPass};
      const result = await freelancerService.updateGuidePassword(id_guide, obj);
    
      if (result.status === 200) {
        dispatch(hideLoadingAction);
        alert('Update password successfully');
      }
    } catch (error) {
      console.log("error", error.response);
      alert('The current password is incorrect');
    }
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
    try {
      dispatch(displayLoadingAction);
      for (let index = 0; index < attractions.length; index++) {
        const item = attractions[index];
        if (item.title || item.content || item.file || item.photo_path) {
          const { file, title, content, photo_path } = item;
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("content", content);
          formData.append("photo_path", photo_path);
          formData.append("id", index + 1);
          await freelancerService.updateGuideAttractionByIdGuide(id_guide, formData);
        }
        else{
          const obj = {id: index + 1}
          await freelancerService.deleteAttraction(id_guide, obj);
        }
      }
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

export const updateGuideTimeByIdGuide = (id_guide, date, session) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {
        date: date,
        session: session
      }
      const result = await freelancerService.updateGuideTimeByIdGuide(id_guide, obj);

      if (result.status === 200) {
        dispatch({
          type: UPDATE_GUIDE_TIME_BY_ID_GUIDE,
          guide_time_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
      alert(error?.response?.data?.message);
    }
  }
};

export const getGuideBookingByIdGuide = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await freelancerService.getGuideBookingByIdGuide(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_BOOKING_BY_ID_GUIDE,
          guide_booking_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};

export const updateBookingStatus = (id_guide, id_guidebooking, status) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {
        id_guidebooking: id_guidebooking,
        status: status
      }
      await freelancerService.updateBookingStatus(id_guide, obj)
      const result = await freelancerService.getGuideBookingByIdGuide(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_BOOKING_BY_ID_GUIDE,
          guide_booking_by_id_guide: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};

export const getGuideReviewByIdGuidebooking = (id_guide) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await freelancerService.getGuideReviewByIdGuidebooking(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING,
          guide_review_by_id_booking: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
}

export const updateReply = (id_guide, id_guidebooking, content, date) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {
        id_guidebooking: id_guidebooking,
        reply: content,
        date: date
      }
      await freelancerService.updateReply(id_guide,obj);
      const result = await freelancerService.getGuideReviewByIdGuidebooking(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING,
          guide_review_by_id_booking: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};

export const updateReport = (id_guide, id_guidebooking, content, date) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {
        id_guidebooking: id_guidebooking,
        report: content,
        date: date
      }
      await freelancerService.updateReport(id_guidebooking,obj);
      const result = await freelancerService.getGuideReviewByIdGuidebooking(id_guide);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_REVIEW_BY_ID_GUIDEBOOKING,
          guide_review_by_id_booking: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};
