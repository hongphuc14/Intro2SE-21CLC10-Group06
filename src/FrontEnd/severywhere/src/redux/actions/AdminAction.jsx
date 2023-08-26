import { adminService } from "../../services/AdminService";
import { UPDATE_SELECTED_MENU_ITEM, UPDATE_SELECTED_SUB_MENU_ITEM, GET_ADMIN_INFO_BY_ID_ADMIN, GET_AVATAR, LOGIN, UPDATE_ADMIN_INFO, 
        UPDATE_ADMIN_PWD, UPLOAD_ADMIN_AVATAR, GET_ARR_FREELANCER_LICENSE, GET_ARR_COMPANY_LICENSE,
        GET_COMPANY_LICENSE, GET_FREELANCER_LICENSE, UPDATE_COMPANY_LICENSE_STATUS, 
        UPDATE_FREELANCER_LICENSE_STATUS, GET_ARR_COMPANY_BOOKING, GET_ARR_FREELANCER_BOOKING,
        GET_ARR_COMPANY, GET_ARR_TOURIST, GET_ARR_FREELANCER, GET_ARR_GUIDE_REVIEW, GET_ARR_TOUR_REVIEW,
        GET_ARR_GUIDE_REPORT, GET_ARR_TOUR_REPORT, GET_TOURIST_INFO_BY_ID_TOURIST, GET_TOURIST_GUIDE_BOOKING, GET_TOURIST_TOUR_BOOKING,
        GET_COMPANY_INFO_BY_ID_COMPANY, GET_COMPANY_TOUR_BY_ID_COMPANY, GET_COMPANY_LICENSES_BY_ID_COMPANY, GET_FREELANCER_INFO_BY_ID_GUIDE,
        GET_FREELANCER_ATTRACTION_BY_ID_GUIDE, GET_FREELANCER_LICENSES_BY_ID_GUIDE, GET_FREELANCER_TIME_BY_ID_GUIDE, GET_FREELANCER_LANGUAGE,
        GET_ARR_TOUR, GET_TOUR, GET_TOUR_BOOKING, GET_TOUR_PHOTO, GET_GUIDE_BOOKING } from "../types";
import { USER_LOGIN } from "../../util/config";

export const updateSelectedMenuItemAction = (selectedMenuItem) => {
    return async(dispatch) => {
        dispatch({
            type: UPDATE_SELECTED_MENU_ITEM,
            payload: selectedMenuItem
        });
    }
};

export const updateSelectedSubMenuItemAction = (selectedSubMenuItem) => {
    return async(dispatch) => {
        dispatch({
            type: UPDATE_SELECTED_SUB_MENU_ITEM,
            payload: selectedSubMenuItem
        });
    }
};

//Api 1: Get admin info
export const getAdminInfoAction = (id_admin) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getAdminInfo(id_admin);
            if (result.status === 200){
                dispatch({
                    type: GET_ADMIN_INFO_BY_ID_ADMIN,
                    admin_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 2: Update admin info
export const updateAdminInfoAction = (id_admin, formData) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateAdminInfo(id_admin, formData);
            if (result.status === 200){
                dispatch({
                    type: UPDATE_ADMIN_INFO,
                    admin_info: result.data.content
                });
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 3: Update admin pwd
export const updateAdminPwdAction = (id_admin, formData) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateAdminPwd(id_admin, formData);
            if (result.status === 200){
                dispatch({
                    type: UPDATE_ADMIN_PWD,
                    admin_info: result.data.content
                });
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 4: Upload admin avatar
export const uploadAdminAvatarAction = (id_admin, img) => {
    return async (dispatch) => {
        try {
            const result = await adminService.uploadAdminAvatar(id_admin, img);
            console.log("result: ", result);
            if (result.status === 200){
                dispatch({
                    type: UPLOAD_ADMIN_AVATAR,
                    admin_info: result.data.content
                });
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
                console.log("get");
                const url = await adminService.getAdminAvatar(result.data.content.id_admin);
                console.log("URL: ", url);
                if (url.status === 200){
                    dispatch({
                        type: GET_AVATAR,
                        admin_avatar: url.data
                    });
                }
            }      
        } catch (error) {
            console.log("error action", error.response);
        }
    };
};

//Api 6: Get arr guide license
export const getArrGuideLicenseAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrGuideLicense();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_FREELANCER_LICENSE,
                    arr_freelancer_license: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 7: Get arr company license
export const getArrCompanyLicenseAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrCompanyLicense();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_COMPANY_LICENSE,
                    arr_company_license: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 8: Get guide license
export const getGuideLicenseAction = (id_guide, file_path) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getGuideLicense(id_guide, file_path);
            if (result.status === 200){
                dispatch({
                    type: GET_FREELANCER_LICENSE,
                    freelancer_license: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 9: Get company license
export const getCompanyLicenseAction = (id_company, file_path) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getCompanyLicense(id_company, file_path);
            if (result){
                dispatch({
                    type: GET_COMPANY_LICENSE,
                    company_license: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 10: update company license status by file_path
export const updateCompanyLicenseStatusAction = (file_path, status) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateCompanyLicenseStatus(file_path, status);
            if (result){
                dispatch(getArrCompanyLicenseAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 11: update freelancer license status by file_path
export const updateFreelancerLicenseStatusAction = (file_path, status) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateFreelancerLicenseStatus(file_path, status);
            if (result){
                dispatch(getArrGuideLicenseAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 12: get array guide booking
export const getArrGuideBookingAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrGuideBooking();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_FREELANCER_BOOKING,
                    arr_guide_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 13: get array tour booking
export const getArrTourBookingAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrTourBooking();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_COMPANY_BOOKING,
                    arr_tour_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 14: get array tourist
export const getArrTouristAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrTourist();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_TOURIST,
                    arr_tourist: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 15: get array freelancer
export const getArrFreelancerAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrFreelancer();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_FREELANCER,
                    arr_freelancer: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 16: get array company
export const getArrCompanyAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrCompany();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_COMPANY,
                    arr_company: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 17: get array tour reviews
export const getArrTourReviewAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrTourReview();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_TOUR_REVIEW,
                    arr_tour_review: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 18: get array guide review
export const getArrGuideReviewAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrGuideReview();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_GUIDE_REVIEW,
                    arr_guide_review: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 19: get array tour report
export const getArrTourReportAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrTourReport();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_TOUR_REPORT,
                    arr_tour_report: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 20: get array guide report
export const getArrGuideReportAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrGuideReport();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_GUIDE_REPORT,
                    arr_guide_report: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 21: update tour report status by id_tour
export const updateTourReportStatusAction = (id_tour) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateTourReportStatus(id_tour);
            if (result){
                dispatch(getArrTourReportAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 22: delete tour report by id_tour
export const deleteTourReportAction = (id_tour) =>{
    return async(dispatch) =>{
        try {
            const result = await adminService.deleteTourReport(id_tour);
            if(result){
                dispatch(getArrTourReportAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    }
}

//Api 23: update guide report status by id_guide
export const updateGuideReportStatusAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateGuideReportStatus(id_guide);
            if (result){
                dispatch(getArrGuideReportAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 24: delete guide report by id_guide
export const deleteGuideReportAction = (id_guide) =>{
    return async(dispatch) =>{
        try {
            const result = await adminService.deleteGuideReport(id_guide);
            if(result){
                dispatch(getArrGuideReportAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    }
}

//Api 25: update tour report status by id_tour
export const updateTourReviewReportStatusAction = (id_tour_booking) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateTourReviewReportStatus(id_tour_booking);
            if (result){
                dispatch(getArrTourReviewAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 26: delete tour report by id_tour
export const deleteTourReviewReportAction = (id_tour_booking) =>{
    return async(dispatch) =>{
        try {
            const result = await adminService.deleteTourReviewReport(id_tour_booking);
            if(result){
                dispatch(getArrTourReviewAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    }
}

//Api 27: update guide report status by id_guide
export const updateGuideReviewReportStatusAction = (id_guide_booking) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateGuideReviewReportStatus(id_guide_booking);
            if (result){
                dispatch(getArrGuideReviewAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 28: delete guide report by id_guide
export const deleteGuideReviewReportAction = (id_guide_booking) =>{
    return async(dispatch) =>{
        try {
            const result = await adminService.deleteGuideReviewReport(id_guide_booking);
            if(result){
                dispatch(getArrGuideReviewAction());
            }
        } catch (error) {
            console.log("error", error.response);
        }
    }
};

//Api 29: get tourist info by id_tourist
export const getTouristByIDAction = (id_tourist) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getTouristByID(id_tourist);
            if (result.status === 200){
                dispatch({
                    type: GET_TOURIST_INFO_BY_ID_TOURIST,
                    tourist_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 30: get tourist guide booking
export const getTouristGuideBookingAction = (id_tourist) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getTouristGuideBooking(id_tourist);
            if (result.status === 200){
                dispatch({
                    type: GET_TOURIST_GUIDE_BOOKING,
                    tourist_guide_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 31: get Tourist tour booking
export const getTouristTourBookingAction = (id_tourist) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getTouristTourBooking(id_tourist);
            if (result.status === 200){
                dispatch({
                    type: GET_TOURIST_TOUR_BOOKING,
                    tourist_tour_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 32: get company info by id_company
export const getCompanyByIDAction = (id_company) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getCompanyByID(id_company);
            if (result.status === 200){
                dispatch({
                    type: GET_COMPANY_INFO_BY_ID_COMPANY,
                    company_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 33: get company tour
export const getCompanyTourAction = (id_company) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getCompanyTour(id_company);
            if (result.status === 200){
                dispatch({
                    type: GET_COMPANY_TOUR_BY_ID_COMPANY,
                    company_tour: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 34: Get company licenses by id_company
export const getCompanyLicensesByIDCompanyAction = (id_company) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getCompanyLicensesByIDCompany(id_company);
            if (result){
                dispatch({
                    type: GET_COMPANY_LICENSES_BY_ID_COMPANY,
                    company_licenses: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 35: get freelancer info by id_guide
export const getFreelancerByIDAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getFreelancerByID(id_guide);
            if (result.status === 200){
                dispatch({
                    type: GET_FREELANCER_INFO_BY_ID_GUIDE,
                    freelancer_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 36: get freelancer attraction by id_guide
export const getFreelancerAttractionAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getFreelancerAttraction(id_guide);
            if (result.status === 200){
                dispatch({
                    type: GET_FREELANCER_ATTRACTION_BY_ID_GUIDE,
                    freelancer_attraction: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 37: get freelancer licenses by id_guide
export const getFreelancerLicensesByIDGuideAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getFreelancerLicensesByIDGuide(id_guide);
            if (result){
                dispatch({
                    type: GET_FREELANCER_LICENSES_BY_ID_GUIDE,
                    freelancer_licenses: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 38: get freelancer time
export const getFreelancerTimeAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getFreelancerTime(id_guide);
            if (result.status === 200){
                dispatch({
                    type: GET_FREELANCER_TIME_BY_ID_GUIDE,
                    freelancer_time: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 39: get freelancer language
export const getFreelancerLanguageAction = (id_guide) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getFreelancerLanguage(id_guide);
            if (result.status === 200){
                dispatch({
                    type: GET_FREELANCER_LANGUAGE,
                    freelancer_language: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 40: get array tour 
export const getArrTourAction = () => {
    return async(dispatch) => {
        try {
            const result = await adminService.getArrTour();
            if (result.status === 200){
                dispatch({
                    type: GET_ARR_TOUR,
                    arr_tour: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 41: get tour
export const getTourByIDAction = (id_tour) =>{
    return async(dispatch) => {
        try {
            const result = await adminService.getTourByID(id_tour);
            if (result.status === 200){
                dispatch({
                    type: GET_TOUR,
                    tour_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
}

//Api 42: get tour booking
export const getTourBookingAction = (id_tour) =>{
    return async(dispatch) => {
        try {
            const result = await adminService.getTourBooking(id_tour);
            if (result.status === 200){
                dispatch({
                    type: GET_TOUR_BOOKING,
                    tour_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
}

//Api 43: get tour photo
export const getTourPhotoAction = (id_tour) =>{
    return async(dispatch) => {
        try {
            const result = await adminService.getTourPhoto(id_tour);
            if (result.status === 200){
                dispatch({
                    type: GET_TOUR_PHOTO,
                    tour_photo: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
}

//Api 45: get guide booking
export const getGuideBookingAction = (id_guide_booking) =>{
    return async(dispatch) => {
        try {
            const result = await adminService.getGuideBooking(id_guide_booking);
            if (result.status === 200){
                dispatch({
                    type: GET_GUIDE_BOOKING,
                    guide_booking: result.data
                });
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
}