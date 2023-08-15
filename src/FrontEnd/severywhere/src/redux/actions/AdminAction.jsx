import { adminService } from "../../services/AdminService";
import { GET_ADMIN_INFO_BY_ID_ADMIN, GET_AVATAR, LOGIN, UPDATE_ADMIN_INFO, UPDATE_ADMIN_PWD, UPLOAD_ADMIN_AVATAR } from "../types";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from  "./LoadingAction";
import { USER_LOGIN, TokenKey } from "../../util/config";

//Api 1: Get admin info
export const getAdminInfoAction = (id_admin) => {
    return async(dispatch) => {
        try {
            const result = await adminService.getAdminInfo(id_admin);
            if (result.status === 200){
                dispatch({
                    type: GET_ADMIN_INFO_BY_ID_ADMIN,
                    admin_info: result.data.content
                });
            }
        } catch (error) {
            console.log("error", error.response);
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
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
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
                    admin_info: result.data.content
                });
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
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
            console.log("result: ", result);
            if (result.status === 200){
                dispatch({
                    type: UPLOAD_ADMIN_AVATAR,
                    admin_info: result.data.content
                });
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
                console.log("get");
                const url = await adminService.getAdminAvatar(result.data.content.id_admin);
                console.log("URL: ", url);
                if (url.status === 200){
                    dispatch({
                        type: GET_AVATAR,
                        admin_avatar: url.data
                    });
                }
            }      
        } catch (error) {
            console.log("error action", error.response);
        }
    };
};

// //Api 5: Get admin avatar
// export const getAdminAvatarAction = (id_admin) => {
//     return async(dispatch) => {
//         try {
//             const result = await adminService.getAdminAvatar(id_admin);
//             console.log("result_get_advatar: ", result);
//             if (result.status === 200){
//                 dispatch({
//                     type: GET_AVATAR,
//                     admin_avatar: result
//                 });
//             }
//         } catch (error) {
//             console.log("error", error.response);
//         }
//     };
// };