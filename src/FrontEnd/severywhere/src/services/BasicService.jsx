import { baseService } from "./baseServices";

export class BasicService extends baseService {
    constructor() {
      super();
    }

    // Api 1: login
    logIn = (user_login) => {
      return this.get('basic/login', user_login);
    }

    // Api 2: thông tin destination
    getDestination = () => {
      return this.get(`basic/destination`);
    };
  }
  
export const basicService = new BasicService();