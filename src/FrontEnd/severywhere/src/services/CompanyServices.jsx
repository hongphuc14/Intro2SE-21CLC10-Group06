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

    getCompanyTour = (id_company) => {
      return this.get(`company/getTour/${id_company}`);
    };

    updateTourFile = (id_tour, formData) => {
      return this.post(`company/updateTourFile/${id_tour}`, formData)
    }

    updateTourInfo = (id_tour, obj) => {
      return this.put(`company/updateTourInfo/${id_tour}`, obj)
    }

    deleteCompanyTour = (id_tour) => {
      return this.put(`company/deleteTour/${id_tour}`)
    }

    // getCompanyBooking = (id_company) => {
    //   return this.get(`company/getBooking/${id_company}`)
    // }

    // updateCompanybooking = (id_company, obj) => {
    //   return this.put(`company/updateBooking/${id_company}`, obj)
    // }

    getCompanyReview = (id_company) => {
      return this.get(`company/getReview/${id_company}`)
    }

    updateCompanyReply = (id_company, obj) => {
      return this.put(`company/updateReply/${id_company}`, obj)
    }

    updateCompanyReport = (id_company, obj) => {
      return this.put(`company/updateReport/${id_company}`, obj)
    }
  }
  
  export const companyService = new CompanyService();