import './ProfileAdmin.scss';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdminInfoAction, updateAdminInfoAction, updateAdminPwdAction, uploadAdminAvatarAction } from "../../../redux/actions/AdminAction";


function ProfileAdmin(props){
    const { admin_info } = useSelector((state) => state.AdminReducer);
    console.log("profileAdmin admin_info before: ", admin_info);
    const dispatch = useDispatch();
    const [newInfo, setNewInfo] = useState({
        fullname: admin_info.fullname,
        email: admin_info.email,
        phone: admin_info.phone,
        birthday: moment(admin_info.birthday).format("YYYY-MM-DD"),
        gender: admin_info.gender
    }); // State to hold updated admin information
    const [avatar, setAvatar] = useState(null); // State to hold the uploaded avatar
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [updateSuccess, setUpdateSuccess] = useState(false); // State for success message
    // const handleUpdate = () =>{
    //     dispatch(updateAdminInfoAction(admin_info.id_admin, newInfo));
    //     setUpdateSuccess(true);
    // }
    const handleUpdate = async () => {
        await dispatch(updateAdminInfoAction(admin_info.id_admin, newInfo)); // Dispatch update action
        dispatch(getAdminInfoAction(admin_info.id_admin)); // Refresh admin_info in Redux store
    };
    const handleUploadAvatar = () =>{
        if(avatar){
            const formData = new FormData();
            formData.append("dataUpload", avatar);
            dispatch(uploadAdminAvatarAction(admin_info.id_admin, formData));
            setUpdateSuccess(true);
        }
    }
    const handleUpdatePwd = () =>{
        dispatch(updateAdminPwdAction(admin_info.id_admin, passwordData));
    }

    return(
        <div className='adminInfo'>
            <div className='admin-path'>
                <i className="fa-solid fa-house" style={{fontSize:"18px"}}></i>
                <span className='admin-path-name'>Profile</span>
            </div>
            <div className='profile-form'>
                <div className='profile-header'>
                    <h3 className='profile-header-name'>Profile</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Fullname</label>
                            <input className="custom-form-control" id="fullname" value={newInfo.fullname} onChange={(e) => setNewInfo({ ...newInfo, fullname: e.target.value })}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column email-group">
                            <label>Email</label>
                            <input className="custom-form-control" id="email-input" value={newInfo.email} onChange={(e) => setNewInfo({ ...newInfo, email: e.target.value })}/>
                        </div>
                        <div className="custom-form-group custom-column phone-group">
                            <label>Phone</label>
                            <input className="custom-form-control" id="phone" value={newInfo.phone} onChange={(e) => setNewInfo({ ...newInfo, phone: e.target.value })}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column birthday-group">
                            <label>Birthday</label>
                            <input className="custom-form-control" id="birthday" value={newInfo.birthday} onChange={(e) => setNewInfo({ ...newInfo, birthday: e.target.value })}/>
                        </div>
                        <div className="custom-form-group custom-column gender-group">
                            <label>Gender</label>
                            <input className="custom-form-control" id="gender" value={newInfo.gender === 1 ? "Female" : "Male"} onChange={(e) => setNewInfo({ ...newInfo, gender: e.target.value })}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-12 mb-3 pb-2" style={{display:"flex", justifyContent:"space-between"}}>
                <button className="btn btn-primary ml-1 mt-2" id="btnUpdate" onClick={handleUpdate}>Update</button>
                {updateSuccess && <span style={{ color: "green" }}>Update successful!</span>}
                <label htmlFor="avatarUpload" className="btn btn-primary ml-1 mt-2" id="btnUpload">Upload avatar</label>
                <input type="file" accept="image/*" id="avatarUpload"style={{ display: "none" }} onChange={(e) => setAvatar(e.target.files[0])}/>
                {updateSuccess && <span style={{ color: "green" }}>Update successful!</span>}
            </div>
            
            <div className='profile-form'>
                <div className='pwd-header'>
                    <h3 className='pwd-header-name'>Change Password</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Current password</label>
                            <input className="custom-form-control"/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Enter new password</label>
                            <input className="custom-form-control"/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Confirm password</label>
                            <input className="custom-form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary ml-1 mt-2" id="btnChange" onClick={handleUpdatePwd}>Change</button>
        </div>
    ) 
}

export default memo(ProfileAdmin);