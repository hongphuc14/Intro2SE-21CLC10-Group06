import { baseService } from "./baseServices";

export class TouristService extends baseService {
    constructor() {
      super();
    }

    getTouristInfo = (email) => {
      return this.get(`tourist/getInfo/${email}`);
    };

    updateTouristInfo = (id_tourist, obj) => {
      return this.put(`tourist/updateInfo/${id_tourist}`, obj);
    };

    updateTouristAvatar = (id_tourist, formData) => {
      return this.post(`tourist/updateAvatar/${id_tourist}`, formData);
    };

    getTourSearch = (feature) => {
      const {destination, rating, below_price, upper_price} = feature
      return this.get(`tourist/getTourSearch/${destination}/${rating}/${below_price}/${upper_price}`);
    };

    getGuideSearch = (feature) => {
      const {destination, rating, below_price, upper_price} = feature
      return this.get(`tourist/getGuideSearch/${destination}/${rating}/${below_price}/${upper_price}`);;
    };

    reportTour = (id_tourist, obj) => {
      return this.post(`tourist/reportTour/${id_tourist}`, obj);
    };

    reportGuide = (id_tourist, obj) => {
      return this.post(`tourist/reportGuide/${id_tourist}`, obj);
    };

    bookTour = (id_tourist, obj) => {
      return this.post(`tourist/bookTour/${id_tourist}`, obj);
    };

    bookGuide = (id_tourist, obj) => {
      return this.post(`tourist/bookGuide/${id_tourist}`, obj);
    };

    getTourBooking = (id_tourist) => {
      return this.get(`tourist/getTourBooking/${id_tourist}`);
    };

    getGuideBooking = (id_tourist) => {
      return this.get(`tourist/getGuideBooking/${id_tourist}`);
    };

    cancelTour = (id_tourist, obj) => {
      return this.put(`tourist/cancelTour/${id_tourist}`, obj);
    };

    cancelGuide = (id_tourist, obj) => {
      return this.put(`tourist/cancelGuide/${id_tourist}`, obj);
    };

    updateReview = (id_tourist, obj) => {
      return this.put(`tourist/updateReview/${id_tourist}`, obj);
    };

  }
  
  export const touristService = new TouristService();