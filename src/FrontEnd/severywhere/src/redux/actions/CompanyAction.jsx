import { GET_COMPANY_INFO, 
    GET_GOMPANY_LICENSE,
    UPDATE_COMPANY_INFO,
    UPDATE_COMPANY_LICENSE,
    GET_TOUR_BY_ID_COMPANY,
    ADD_TOUR_BY_ID_COMPANY,
    UPDATE_TOUR_BY_ID_TOUR,
    DELETE_TOUR_BY_ID_TOUR,
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
          alert('Update password successfully');
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
  