import { baseService } from "./baseServices";

export class BasicService extends baseService {
    constructor() {
      super();
    }

    // Api 1: thông tin destination
    getDestination = () => {
      return this.get(`api/destinations`);
    };
  }
  
export const basicService = new BasicService();