// import { baseService } from "./baseServices";

// export class TouristService extends baseService {
//     constructor() {
//       super();
//     }

//     getTouristInfo = (email) => {
//       return this.get(`tourist/getInfo/${email}`);
//     };

//     updateTouristInfo = (id_tourist, obj) => {
//       return this.put(`tourist/updateInfo/${id_tourist}`, obj);
//     };

//     updateTouristAvatar = (id_tourist, formData) => {
//       return this.post(`tourist/updateAvatar/${id_tourist}`, formData);
//     };

//     deleteCompanyAvatar = (id_company) => {
//       return this.put(`company/deleteAvatar/${id_company}`);
//     };

//     updateCompanyPassword = (id_company, obj) => {
//       return this.put(`company/updatePwd/${id_company}`, obj);
//     };

//     deleteCompanyLicense = (id_company, obj) => {
//       return this.put(`company/deleteLicense/${id_company}`, obj);
//     };

//     updateCompanyLicense = (id_company, formData) => {
//       // console.log(formData)
//       return this.post(`company/updateLicense/${id_company}`, formData);
//     };

//     getCompanyTour = (id_company) => {
//       return this.get(`company/getTour/${id_company}`);
//     };

//     updateTourFile = (id_tour, formData) => {
//       return this.post(`company/updateTourFile/${id_tour}`, formData)
//     }

//     updateTourInfo = (id_tour, obj) => {
//       return this.put(`company/updateTourInfo/${id_tour}`, obj)
//     }

//     deleteCompanyTour = (id_tour) => {
//       return this.put(`company/deleteTour/${id_tour}`)
//     }

//     getCompanyBooking = (id_company) => {
//       return this.get(`company/getBooking/${id_company}`)
//     }

//     updateCompanyBooking = (id_tour_booking, obj) => {
//       return this.put(`company/updateBooking/${id_tour_booking}`, obj)
//     }

//     getCompanyReview = (id_company) => {
//       return this.get(`company/getReview/${id_company}`)
//     }

//     updateCompanyReply = (id_company, obj) => {
//       return this.put(`company/updateReply/${id_company}`, obj)
//     }

//     updateCompanyReport = (id_company, obj) => {
//       return this.put(`company/updateReport/${id_company}`, obj)
//     }
//   }
  
//   export const touristService = new TouristService();