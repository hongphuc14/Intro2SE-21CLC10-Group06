import { baseService } from "./baseServices";

export class CompanyService extends baseService {
    constructor() {
      super();
    }

    getCompanyInfo = (email) => {
      return this.get(`company/getInfo/${email}`);
    };

    getCompanyLicense = (id_guide) => {
      return this.get(`company/getLicense/${id_guide}`);
    };

    updateCompanyInfo = (id_company, obj) => {
      return this.put(`company/updateInfo/${id_company}`, obj);
    };

    updateCompanyAvatar = (id_company, formData) => {
      return this.post(`company/updateAvatar/${id_company}`, formData);
    };

    deleteCompanyAvatar = (id_company) => {
      return this.put(`company/deleteAvatar/${id_company}`);
    };

    updateCompanyPassword = (id_company, obj) => {
      return this.put(`company/updatePwd/${id_company}`, obj);
    };

    deleteCompanyLicense = (id_company, obj) => {
      return this.put(`company/deleteLicense/${id_company}`, obj);
    };

    updateCompanyLicense = (id_company, formData) => {
      // console.log(formData)
      return this.post(`company/updateLicense/${id_company}`, formData);
    };


    // // Api 7: cập nhật giấy phép của tourguide khi có id_company
    // updateGuideLicense = (id_company, formData) => {
    //   // console.log(formData)
    //   return this.post(`company/updateLicense/${id_company}`, formData);
    // };
    // // Api 10: lấy guide_booking khi có id_company
    // getGuideBookingByIdGuide = (id_company) => {
    //   return this.get(`company/getBooking/${id_company}`);
    // };

    


  }
  
  export const companyService = new CompanyService();