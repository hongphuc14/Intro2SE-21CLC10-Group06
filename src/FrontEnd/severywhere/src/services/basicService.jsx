import { baseService } from "./baseServices";
export class BasicService extends baseService {
    // constructor() {
    //   super();
    // }

    // Api 1: login
    logIn = (user_login) => {
      return this.post(`basic/login`, user_login);
    }

    // Api 2: thông tin destination
    getDestination = () => {
      return this.get(`basic/destination`);
    };

    // Api 3: Signup
    signUp = (formData) =>{
      return this.post(`basic/signup`, formData);
    };

    // Api 4: Delete account
    deleteAccount = (id_role, id) =>{
      return this.delete(`basic/logout/${id_role}/${id}`);
    };

    //Api 5: get user info by email
    getInfoByEmail = (email) =>{
      return this.get(`basic/getInfo/${email}`);
    };
  }
  
export const basicService = new BasicService();