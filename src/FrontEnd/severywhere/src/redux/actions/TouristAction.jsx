// import { GET_TOURIST_INFO, 
//     GET_TOUR_SEARCH,
//     GET_GUIDE_SEARCH,
//     UPDATE_TOURIST_CART,
//     GET_TOURIST_BOOKING } 
//   from "../types";

//   import {displayLoadingAction, hideLoadingAction} from './LoadingAction';
//   import {touristService} from '../../services/TouristService';
  
//   export const getTouristInfo = (email) => {
//     return async (dispatch) => {
//       try {
//         dispatch(displayLoadingAction);
//         const result = await touristService.getTouristInfo(email);
//         if (result.status === 200) {
//           dispatch({
//             type: GET_TOURIST_INFO,
//             tourist_info: result.data.content,
//           });
//           dispatch(hideLoadingAction);
//         }
//       } catch (error) {
//         console.log("error", error.response);
//       }
//     }
//   };

//   export const updateTouristInfo = (id_tourist, info) => {
//     return async (dispatch) => {
//       try {
//         dispatch(displayLoadingAction);
//         console.log(info)
//         const result = await touristService.updateTouristInfo(id_tourist, info);
//         if (result.status === 200) {
//           dispatch({
//             type: GET_TOURIST_INFO,
//             tourist_info: result.data.content,
//           });
//           dispatch(hideLoadingAction);
//         }
//       } catch (error) {
//         console.log("error", error.response);
//       }
//     };
//   };

//   export const updateTouristAvatar = (id_tourist, avatar) => {
//     return async (dispatch) => {
//       try {
//         dispatch(displayLoadingAction);
//           const formData = new FormData();
//           formData.append('file', avatar);
//           console.log(formData)
//           const result = await touristService.updateTouristAvatar(id_tourist, formData);
//           if (result.status === 200) {
//             dispatch({
//               type: GET_TOURIST_INFO,
//               tourist_info: result.data.content})
//             dispatch(hideLoadingAction);
//           }
//       } catch (error) {
//         console.log("error", error.response);
//         alert(error?.response?.data?.message);
//       }
//     }
//   };

//   export const updateTouristPassword = (id_tourist,currentPass, newPass) => {
//     return async (dispatch) => {
//       try {
//         dispatch(displayLoadingAction);
//         const obj = {c_password: currentPass, n_password: newPass};
//         const result = await touristService.updateTouristPassword(id_tourist, obj);
//         if (result.status === 200) {
//           dispatch(hideLoadingAction);
//           alert('Update password successfulort');
//         }
//       } catch (error) {
//         console.log("error", error.response);
//         alert('The current password is incorrect');
//       }
//     };
//   };

// //   export const getCompanyTour = (id_company) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const result = await companyService.getCompanyTour(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_TOUR_BY_ID_COMPANY,
// //             company_tour: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };
  
// //   export const deleteCompanyTour = (id_company, id_tour) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         await companyService.deleteCompanyTour(id_tour);
// //         const result = await companyService.getCompanyTour(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_TOUR_BY_ID_COMPANY,
// //             company_tour: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   export const updateTour = (id_company, tour, preview) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         await companyService.updateTourInfo(tour.id_tour, {...tour, id_company: id_company});
// //         if (preview){
// //           const formData = new FormData();
// //           formData.append('file', preview);
// //           await companyService.updateTourFile(tour.id_tour, formData);
// //         }
// //         const result = await companyService.getCompanyTour(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_TOUR_BY_ID_COMPANY,
// //             company_tour: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   // export const updateTourFile = (id_company, id_tour, preview) => {
// //   //   return async (dispatch) => {
// //   //     try {
// //   //       dispatch(displayLoadingAction);
        
// //   //       const result = await companyService.getCompanyTour(id_company);
// //   //       if (result.status === 200) {
// //   //         dispatch({
// //   //           type: GET_TOUR_BY_ID_COMPANY,
// //   //           company_tour: result.data.content,
// //   //         });
// //   //         dispatch(hideLoadingAction);
// //   //       }
// //   //     }
// //   //     catch (error) {
// //   //       console.log("error", error.response);
// //   //     }
// //   //   }
// //   // };

// //   export const getCompanyBooking = (id_company) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const result = await companyService.getCompanyBooking(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_COMPANY_BOOKING,
// //             company_booking: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   export const updateCompanyBooking = (id_company, id_tour_booking, status) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const obj  = {status: status}
// //         await companyService.updateCompanyBooking(id_tour_booking, obj);
// //         const result = await companyService.getCompanyBooking(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_COMPANY_BOOKING,
// //             company_booking: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   export const getCompanyReview = (id_company) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const result = await companyService.getCompanyReview(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_COMPANY_REVIEW,
// //             company_review: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   export const updateReply = (id_company, id_tour_booking, reply, reply_date) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const obj  = {id_tour_booking, reply, reply_date}
// //         await companyService.updateCompanyReply(id_company, obj);
// //         const result = await companyService.getCompanyReview(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_COMPANY_REVIEW,
// //             company_review: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };

// //   export const updateReport = (id_company, id_tour_booking, report, report_date) => {
// //     return async (dispatch) => {
// //       try {
// //         dispatch(displayLoadingAction);
  
// //         const obj  = {id_tour_booking, report, report_date}
// //         await companyService.updateCompanyReport(id_company, obj);
// //         const result = await companyService.getCompanyReview(id_company);
// //         if (result.status === 200) {
// //           dispatch({
// //             type: GET_COMPANY_REVIEW,
// //             company_review: result.data.content,
// //           });
// //           dispatch(hideLoadingAction);
// //         }
// //       } catch (error) {
// //         console.log("error", error.response);
// //       }
// //     };
// //   };