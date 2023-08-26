import { GET_TOURIST_INFO, 
  GET_TOUR_SEARCH,
  GET_GUIDE_SEARCH,
  GET_TOUR_BOOKING,
  GET_GUIDE_BOOKING } 
from "../types";

import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
import {touristService} from '../../services/TouristService';

export const getTouristInfo = (email) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await touristService.getTouristInfo(email);
      if (result.status === 200) {
        dispatch({
          type: GET_TOURIST_INFO,
          tourist_info: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
};

export const updateTouristInfo = (id_tourist, info) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      console.log(info)
      const result = await touristService.updateTouristInfo(id_tourist, info);
      if (result.status === 200) {
        dispatch({
          type: GET_TOURIST_INFO,
          tourist_info: result.data.content,
        });
        dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const updateTouristAvatar = (id_tourist, avatar) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
        const formData = new FormData();
        formData.append('file', avatar);
        console.log(formData)
        const result = await touristService.updateTouristAvatar(id_tourist, formData);
        if (result.status === 200) {
          dispatch({
            type: GET_TOURIST_INFO,
            tourist_info: result.data.content})
          dispatch(hideLoadingAction);
        }
    } catch (error) {
      console.log("error", error.response);
      alert(error?.response?.data?.message);
    }
  }
};

export const getTourSearch = (feature) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      console.log(feature)
      const result = await touristService.getTourSearch(feature);
      if (result.status === 200) {
        dispatch({
          type: GET_TOUR_SEARCH,
          tour_search: result.data.content,
        });   
        dispatch(hideLoadingAction);       
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const getGuideSearch = (feature) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      console.log(feature)
      const result = await touristService.getGuideSearch(feature);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_SEARCH,
          guide_search: result.data.content,
        });   
        dispatch(hideLoadingAction);       
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const reportTour = (id_tourist, id_tour, report, report_date) => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction);

      const obj  = {id_tour, report, report_date}
      console.log(obj)
      const result = await touristService.reportTour(id_tourist, obj);
      // const result = await companyService.getCompanyReview(id_company);
      if (result.status === 200) {
        alert(result.data.message)
      //   dispatch({
      //     type: GET_COMPANY_REVIEW,
      //     company_review: result.data.content,
      //   });
      //   dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const reportGuide = (id_tourist, id_guide, report, report_date) => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction);

      const obj  = {id_guide, report, report_date}
      console.log(obj)
      const result = await touristService.reportGuide(id_tourist, obj);
      // const result = await companyService.getCompanyReview(id_company);
      if (result.status === 200) {
        alert(result.data.message)
      //   dispatch({
      //     type: GET_COMPANY_REVIEW,
      //     company_review: result.data.content,
      //   });
      //   dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const bookTour = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      console.log(obj)
      const result = await touristService.bookTour(id_tourist, obj);
      // const result = await touristService.getBookedBooking(id_tourist);
      // if (result.status === 200) {
      //   alert(result.data.message)
      //   dispatch({
      //     type: GET_COMPANY_REVIEW,
      //     company_review: result.data.content,
      //   });
      //   dispatch(hideLoadingAction);
      // }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const bookGuide = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      // console.log(obj)
      const result = await touristService.bookGuide(id_tourist, obj);
      // console.log("1", result)
      // const result = await touristService.getBookedBooking(id_tourist);
      // if (result.status === 200) {
      //   alert(result.data.message)
      //   dispatch({
      //     type: GET_COMPANY_REVIEW,
      //     company_review: result.data.content,
      //   });
      //   dispatch(hideLoadingAction);
      // }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const getTourBooking = (id_tourist) => {
  return async (dispatch) => {
    try {
      // console.log(obj)
      const result = await touristService.getTourBooking(id_tourist);
      // console.log("1", result)
      // const result = await touristService.getBookedBooking(id_tourist);
      if (result.status === 200) {
        // alert(result.data.message)
        dispatch({
          type: GET_TOUR_BOOKING,
          tour_booking: result.data.content,
        });
      //   dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const getGuideBooking = (id_tourist) => {
  return async (dispatch) => {
    try {
      // console.log(obj)
      const result = await touristService.getGuideBooking(id_tourist);
      // console.log("1", result)
      // const result = await touristService.getBookedBooking(id_tourist);
      if (result.status === 200) {
        // alert(result.data.message)
        dispatch({
          type: GET_GUIDE_BOOKING,
          guide_booking: result.data.content,
        });
      //   dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error.response);
    }
  };
};

export const cancelTour = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      await touristService.cancelTour(id_tourist, obj);
      const result = await touristService.getTourBooking(id_tourist);
      if (result.status === 200) {
        dispatch({
          type: GET_TOUR_BOOKING,
          tour_booking: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
}

export const cancelGuide = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      await touristService.cancelGuide(id_tourist, obj);
      const result = await touristService.getGuideBooking(id_tourist);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_BOOKING,
          guide_booking: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
}

export const updateTourReview = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      console.log(obj)
      await touristService.updateTourReview(id_tourist, obj);
      const result = await touristService.getTourBooking(id_tourist);
      if (result.status === 200) {
        dispatch({
          type: GET_TOUR_BOOKING,
          tour_booking: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
}

export const updateGuideReview = (id_tourist, obj) => {
  return async (dispatch) => {
    try {
      console.log(obj)
      await touristService.updateGuideReview(id_tourist, obj);
      const result = await touristService.getGuideBooking(id_tourist);
      if (result.status === 200) {
        dispatch({
          type: GET_GUIDE_BOOKING,
          guide_booking: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response);
    }
  }
}

export const updateTouristPassword = (id_tourist,currentPass, newPass) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const obj = {c_password: currentPass, n_password: newPass};
      const result = await touristService.updateTouristPassword(id_tourist, obj);
      if (result.status === 200) {
        dispatch(hideLoadingAction);
        alert('Update password successfully');
      }
    } catch (error) {
      console.log("error", error.response);
      alert('The current password is incorrect');
    }
  };
};

