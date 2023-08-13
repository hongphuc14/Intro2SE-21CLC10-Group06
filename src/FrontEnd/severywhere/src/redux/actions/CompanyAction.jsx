import { GET_COMPANY_INFO, 
    GET_GOMPANY_LICENSE,
    UPDATE_COMPANY_INFO,
    UPDATE_COMPANY_LICENSE,
    GET_TOUR_BY_ID_COMPANY,
    GET_COMPANY_BOOKING,
    GET_COMPANY_REVIEW} 
  from "../types";

  import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
  import {companyService} from '../../services/CompanyServices';
  
  export const getCompanyInfo = (email) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
        const result = await companyService.getCompanyInfo(email);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_INFO,
            company_info: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    }
  };
  
  export const getCompanyLicense = (id_company) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await companyService.getCompanyLicense(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_GOMPANY_LICENSE,
            company_license: result.data.content,
            verified: result.data.content.some((license) => license.status === 2)
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateCompanyInfo = (id_company, info) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await companyService.updateCompanyInfo(id_company, info);
        if (result.status === 200) {
          dispatch({
            type: UPDATE_COMPANY_INFO,
            company_info: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateCompanyAvatar = (id_company, preview) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
        if (preview === "delete"){
          const result = await companyService.deleteCompanyAvatar(id_company);
          if (result.status === 200) {
            dispatch({
              type: UPDATE_COMPANY_INFO,
              company_info: result.data.content})
            dispatch(hideLoadingAction);
          }
        }
        else{
          const formData = new FormData();
          formData.append('file', preview);
          console.log(formData)
          const result = await companyService.updateCompanyAvatar(id_company, formData);
          if (result.status === 200) {
            dispatch({
              type: UPDATE_COMPANY_INFO,
              company_info: result.data.content})
            dispatch(hideLoadingAction);
          }
        }
      } catch (error) {
        console.log("error", error.response);
      }
    }
  };

  export const updateCompanyPassword = (id_guide,currentPass, newPass) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
        const obj = {c_password: currentPass, n_password: newPass};
        const result = await companyService.updateCompanyPassword(id_guide, obj);
        if (result.status === 200) {
          dispatch(hideLoadingAction);
          alert('Update password successfulort');
        }
      } catch (error) {
        console.log("error", error.response);
        alert('The current password is incorrect');
      }
    };
  };
  
  export const updateCompanyLicense = (id_company, license) => {
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
  
        // console.log(obj)
  
        await companyService.deleteCompanyLicense(id_company, obj);
  
        const result = await companyService.updateCompanyLicense(id_company, formData);
        if (result.status === 200) {
          console.log(result);
          dispatch({
            type: UPDATE_COMPANY_LICENSE,
            company_license: result.data.content,
            verified: license.some((license) => license.status === 2)})
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    }
  };

  export const getCompanyTour = (id_company) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await companyService.getCompanyTour(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_TOUR_BY_ID_COMPANY,
            company_tour: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };
  
  export const deleteCompanyTour = (id_company, id_tour) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        await companyService.deleteCompanyTour(id_tour);
        const result = await companyService.getCompanyTour(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_TOUR_BY_ID_COMPANY,
            company_tour: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateTour = (id_company, tour, preview) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        await companyService.updateTourInfo(tour.id_tour, {...tour, id_company: id_company});
        if (preview){
          const formData = new FormData();
          formData.append('file', preview);
          await companyService.updateTourFile(tour.id_tour, formData);
        }
        const result = await companyService.getCompanyTour(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_TOUR_BY_ID_COMPANY,
            company_tour: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  // export const updateTourFile = (id_company, id_tour, preview) => {
  //   return async (dispatch) => {
  //     try {
  //       dispatch(displayLoadingAction);
        
  //       const result = await companyService.getCompanyTour(id_company);
  //       if (result.status === 200) {
  //         dispatch({
  //           type: GET_TOUR_BY_ID_COMPANY,
  //           company_tour: result.data.content,
  //         });
  //         dispatch(hideLoadingAction);
  //       }
  //     }
  //     catch (error) {
  //       console.log("error", error.response);
  //     }
  //   }
  // };

  export const getCompanyBooking = (id_company) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await companyService.getCompanyBooking(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_BOOKING,
            company_booking: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateCompanyBooking = (id_company, id_tour_booking, status) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const obj  = {status: status}
        await companyService.updateCompanyBooking(id_tour_booking, obj);
        const result = await companyService.getCompanyBooking(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_BOOKING,
            company_booking: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const getCompanyReview = (id_company) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const result = await companyService.getCompanyReview(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_REVIEW,
            company_review: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateReply = (id_company, id_tour_booking, reply, reply_date) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const obj  = {id_tour_booking, reply, reply_date}
        await companyService.updateCompanyReply(id_company, obj);
        const result = await companyService.getCompanyReview(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_REVIEW,
            company_review: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };

  export const updateReport = (id_company, id_tour_booking, report, report_date) => {
    return async (dispatch) => {
      try {
        dispatch(displayLoadingAction);
  
        const obj  = {id_tour_booking, report, report_date}
        await companyService.updateCompanyReport(id_company, obj);
        const result = await companyService.getCompanyReview(id_company);
        if (result.status === 200) {
          dispatch({
            type: GET_COMPANY_REVIEW,
            company_review: result.data.content,
          });
          dispatch(hideLoadingAction);
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };
  };