import { baseService } from "./baseServices";

export class FreelancerService extends baseService {
    constructor() {
      super();
    }

    // Api 1: thông tin tourguide khi có id_guide
    getTourGuideByIdGude = (id_guide) => {
      return this.get(`api/guide/${id_guide}`);
    };

    // Api 2: ngôn ngữ của tourguide khi có id_guide
    // guide_language_by_id_guide = (id_guide) => {
    //   return this.get(`api/guide/${id_guide}`);
    // };

    // Api 3: giấy phép của tourguide khi có id_guide
    // guide_license_by_id_guide = (id_guide) => {
    //   return this.get(`api/guide/${id_guide}`);
    // };

    // Api 4: attraction của tourguide khi có id_guide
    // guide_attraction_by_id_guide = (id_guide) => {
    //   return this.get(`api/guide/${id_guide}`);
    // };

    // Api 5: cập nhật thông tin tourguide khi có id_guide
    updateTourGuideByIdGude = (id_guide, info) => {
      return this.post(`api/guide/${id_guide}`, info);
    };

    // Api 6: cập nhật ngôn ngữ của tourguide khi có id_guide


    // Api 7: cập nhật giấy phép của tourguide khi có id_guide


    // Api 8: cập nhật attraction của tourguide khi có id_guide

    
    // Api 9: thông tin calendar khi có id_guide


    // Api 10: cập nhật thông tin calendar khi có id_guide


    


  }
  
  export const freelancerService = new FreelancerService();