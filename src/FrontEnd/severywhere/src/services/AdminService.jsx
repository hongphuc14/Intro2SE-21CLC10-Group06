import { baseService } from "./baseServices";

export class AdminService extends baseService {
    // constructor(){
    //     super();
    // }

    // Api 1: Get admin info
    getAdminInfo = ( id_admin ) =>{
        return this.get(`admin/getInfo/${id_admin}`);
    };

    // Api 2: Update admin info
    updateAdminInfo = ( id_admin, formData ) =>{
        return this.put(`admin/updateInfo/${id_admin}`, formData);
    };

    // Api 3: Update admin password
    updateAdminPwd = ( id_admin, formData ) =>{
        return this.put(`admin/updatePwd/${id_admin}`, formData);
    };

    // Api 4: Upload admin avatar 
    uploadAdminAvatar = ( id_admin, img ) =>{
        return this.post(`admin/uploadAvatar/${id_admin}`, img);
    };

    //Api 5: Get admin avatar
    getAdminAvatar = ( id_admin ) =>{
        return this.get(`admin/getAvatar/${id_admin}`);
    }

    //Api 6: Get arr guide license
    getArrGuideLicense = () =>{
        return this.get(`admin/getArrGuideLicense`);
    }

    //Api 7: Get arr company license
    getArrCompanyLicense = () =>{
        return this.get(`admin/getArrCompanyLicense`);
    }

    //Api 8: Get guide license
    getGuideLicense = ( id_guide, file_path ) =>{
        return this.get(`admin/getGuideLicense/${id_guide}/${file_path}`);
    }

    //Api 9: Get company license
    getCompanyLicense = ( id_company, file_path ) =>{
        return this.get(`admin/getCompanyLicense/${id_company}/${file_path}`);
    }

    // Api 10: update company license status by file_path
    updateCompanyLicenseStatus = ( file_path, status ) =>{
        return this.put(`admin/updateCompanyLicenseStatus/${file_path}/${status}`);
    };

    // Api 11: update freelancer license status by file_path
    updateFreelancerLicenseStatus = ( file_path, status ) =>{
        return this.put(`admin/updateFreelancerLicenseStatus/${file_path}/${status}`);
    };

    //Api 12: get array guide booking
    getArrGuideBooking = () =>{
        return this.get(`admin/getArrGuideBooking`);
    }

    //Api 13: get array tour booking
    getArrTourBooking = () =>{
        return this.get(`admin/getArrTourBooking`);
    }

    //Api 14: get array tourist
    getArrTourist = () =>{
        return this.get(`admin/getArrTourist`);
    }

    //Api 15: get array company
    getArrCompany = () =>{
        return this.get(`admin/getArrCompany`);
    }

    //Api 16: get array freelancer
    getArrFreelancer = () =>{
        return this.get(`admin/getArrFreelancer`);
    }

    //Api 17: get array tour reviews
    getArrTourReview = () =>{
        return this.get(`admin/getArrTourReview`);
    }

    //Api 18: get array guife reviews
    getArrGuideReview = () =>{
        return this.get(`admin/getArrGuideReview`);
    }

    //Api 19: get array tour report
    getArrTourReport = () =>{
        return this.get(`admin/getArrTourReport`);
    }

    //Api 20: get array guide report
    getArrGuideReport = () =>{
        return this.get(`admin/getArrGuideReport`);
    }

    //Api 21: update tour report status
    updateTourReportStatus = (id_tour) =>{
        return this.put(`admin/updateTourReportStatus/${id_tour}`);
    }

    //Api 22: delete tour report
    deleteTourReport = (id_tour) =>{
        return this.delete(`admin/deleteTourReport/${id_tour}`);
    }

    //Api 23: update guide report status
    updateGuideReportStatus = (id_guide) =>{
        return this.put(`admin/updateGuideReportStatus/${id_guide}`);
    }

    //Api 24: delete guide report
    deleteGuideReport = (id_guide) =>{
        return this.delete(`admin/deleteGuideReport/${id_guide}`);
    }

    //Api 25: update tour review report status
    updateTourReviewReportStatus = (id_tour_booking) =>{
        console.log("update")
        return this.put(`admin/updateTourReviewReportStatus/${id_tour_booking}`);
    }

    //Api 26: delete tour review report
    deleteTourReviewReport = (id_tour_booking) =>{
        return this.delete(`admin/deleteTourReviewReport/${id_tour_booking}`);
    }

    //Api 27: update guide review report status
    updateGuideReviewReportStatus = (id_guide_booking) =>{
        return this.put(`admin/updateGuideReviewReportStatus/${id_guide_booking}`);
    }

    //Api 28: delete guide review report
    deleteGuideReviewReport = (id_guide_booking) =>{
        return this.delete(`admin/deleteGuideReviewReport/${id_guide_booking}`);
    }

    // Api 29: get tourist info by id_tourist
    getTouristByID = ( id_tourist ) =>{
        return this.get(`admin/getTouristByID/${id_tourist}`);
    };

    //Api 30: get tourist guide booking
    getTouristGuideBooking = (id_tourist) =>{
        return this.get(`admin/getTouristGuideBooking/${id_tourist}`);
    }

    //Api 31: get tourist tour booking
    getTouristTourBooking = (id_tourist) =>{
        return this.get(`admin/getTouristTourBooking/${id_tourist}`);
    }

    // Api 32: get company info by id_company
    getCompanyByID = ( id_company ) =>{
        return this.get(`admin/getCompanyByID/${id_company}`);
    };

    //Api 33: get company tour
    getCompanyTour = (id_company) =>{
        return this.get(`admin/getCompanyTour/${id_company}`);
    }

    //Api 34: Get company license
    getCompanyLicensesByIDCompany = ( id_company ) =>{
        return this.get(`admin/getCompanyLicensesByIDCompany/${id_company}`);
    }
    
    // Api 35: get freelancer info by id_guide
    getFreelancerByID = ( id_guide ) =>{
        return this.get(`admin/getFreelancerByID/${id_guide}`);
    }

    //Api 36: get freelancer attraction by id_guide
    getFreelancerAttraction = (id_guide) =>{
        return this.get(`admin/getFreelancerAttraction/${id_guide}`);
    }
    //Api 37: get freelancer licenses by id_guide
    getFreelancerLicensesByIDGuide = ( id_guide ) =>{
        return this.get(`admin/getFreelancerLicensesByIDGuide/${id_guide}`);
    }

    //Api 38: get freelancer time
    getFreelancerTime = (id_guide) =>{
        return this.get(`admin/getFreelancerTime/${id_guide}`);
    }

     //Api 39: get freelancer language
     getFreelancerLanguage = (id_guide) =>{
        return this.get(`admin/getFreelancerLanguage/${id_guide}`);
    }

    //Api 40: get array tour 
    getArrTour = () =>{
        return this.get(`admin/getArrTour`);
    }
    
    // Api 41: get tour info
    getTourByID = ( id_tour ) =>{
        return this.get(`admin/getTourByID/${id_tour}`);
    }

    // Api 42: get tour booking
    getTourBooking = ( id_tour ) =>{
        return this.get(`admin/getTourBooking/${id_tour}`);
    }

    // Api 43: get tour photo
    getTourPhoto = ( id_tour ) =>{
        return this.get(`admin/getTourPhoto/${id_tour}`);
    }

    // Api 44: get tour booking
    getTourBookingByID = ( id_tour ) =>{
        return this.get(`admin/getTourBookingByID/${id_tour}`);
    }

    //Api 45: get guide booking
    getGuideBooking = (id_guide_booking) =>{
        return this.get(`admin/getGuideBooking/${id_guide_booking}`);
    }
}

export const adminService = new AdminService();