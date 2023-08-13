import { adminService } from "../../services/AdminService";
import { GET_ADMIN_INFO_BY_ID_ADMIN, UPDATE_ADMIN_INFO, UPDATE_ADMIN_PWD } from "../types";
import { history } from "../../App";
//import { displayLoadingAction, hideLoadingAction } from  "./LoadingAction";

//Api 1: Get admin info
export const getAdminInfoAction = (id_admin) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getAdminInfo(id_admin);
            if (result.status === 200){
                console.log("AdminAction admin_info:", result.data);
                dispatch({
                    type: GET_ADMIN_INFO_BY_ID_ADMIN,
                    admin_info: result.data.content
                });
            }
        } catch (error) {
            console.log("Adminaction error", error.response);
        }
    };
};

//Api 2: Update admin info
export const updateAdminInfoAction = (id_admin, formData) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateAdminInfo(id_admin, formData);
            if (result.status === 200){
                dispatch({
                    type: UPDATE_ADMIN_INFO,
                    admin_info: result.data.content
                });
                dispatch(getAdminInfoAction(id_admin));
                if(result.data.id_admin === JSON.parse(localStorage.getItem("USER_LOGIN")).admin_info.id_admin){
                    history.push("/admin/profile");
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 3: Update admin pwd
export const updateAdminPwdAction = (id_admin, formData) => {
    return async(dispatch) => {
        try {
            const result = await adminService.updateAdminPwd(id_admin, formData);
            if (result.status === 200){
                dispatch({
                    type: UPDATE_ADMIN_PWD,
                    admin_info: result.data.c_password
                });
                dispatch(getAdminInfoAction(id_admin));
                if(id_admin === JSON.parse(localStorage.getItem("USER_LOGIN")).admin_info.id_admin){
                    history.push("/admin/profile");
                    window.location.reload();
                }
            }
        } catch (error) {
            console.log("error", error.response);
        }
    };
};

//Api 4: Upload admin avatar
export const uploadAdminAvatarAction = (id_admin, img) => {
    return async (dispatch) => {
      try {
        const result = await adminService.uploadAdminAvatar(id_admin, img);
        console.log(result);
      } catch (error) {
        console.log("error", error.response);
      }
    };
};