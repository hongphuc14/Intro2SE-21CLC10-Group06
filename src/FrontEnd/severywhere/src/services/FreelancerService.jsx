import { baseService } from "./baseServices";

export class FreelancerService extends baseService {
    // constructor() {
    //   super();
    // }

    // Api 1: thông tin tourguide khi có id_guide
    getTourGuideByIdGuide = (email) => {
      return this.get(`freelancer/getInfo/${email}`);
    };

    // Api 2: ngôn ngữ của tourguide khi có id_guide
    getGuideLanguageByIdGuide = (id_guide) => {
      return this.get(`freelancer/getLanguage/${id_guide}`);
    };

    // Api 3: giấy phép của tourguide khi có id_guide
    getGuideLicenseByIdGuide = (id_guide) => {
      return this.get(`freelancer/getLicense/${id_guide}`);
    };

    // Api 4: attraction của tourguide khi có id_guide
    getGuideAttractionByIdGuide = (id_guide) => {
      return this.get(`freelancer/getAttraction/${id_guide}`);
    };

    // Api 5: cập nhật thông tin tourguide khi có id_guide
    updateGuideInfo = (id_guide, info) => {
      return this.put(`freelancer/updateInfo/${id_guide}`, info);
    };

    // Api 6: cập nhật ngôn ngữ của tourguide khi có id_guide
    updateGuideLanguage = (id_guide, language) => {
      console.log(language)
      return this.put(`freelancer/updateLanguage/${id_guide}`, language);
    };

    // Api 7: cập nhật giấy phép của tourguide khi có id_guide
    // updateGuideInfo = (id_guide, info) => {
    //   return this.put(`freelancer/updateInfo/${id_guide}`, info);
    // };

    // Api 8: cập nhật attraction của tourguide khi có id_guide
    // updateGuideInfo = (id_guide, info) => {
    //   return this.put(`freelancer/updateInfo/${id_guide}`, info);
    // };
    
    // Api 9: thông tin calendar khi có id_guide
    getGuideTimeByIdGuide = (id_guide) => {
      return this.get(`freelancer/getTime/${id_guide}`);
    };

    // Api 10: cập nhật thông tin calendar khi có id_guide


    


  }
  
  export const freelancerService = new FreelancerService();