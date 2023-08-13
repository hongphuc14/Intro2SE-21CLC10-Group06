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
    updateAdminInfo = ( id_admin, formData) =>{
        return this.put(`admin/updateInfo/${id_admin}`, formData);
    };

    // Api 3: Update admin password
    updateAdminPwd = ( id_admin, formData) =>{
        return this.put(`admin/updatePwd/${id_admin}`, formData);
    };

    // Api 4: Upload admin avatar 
    uploadAdminAvatar = ( id_admin, img) =>{
        return this.put(`admin/updateAvatar/${id_admin}`, img);
    };

}

export const adminService = new AdminService();