import './ProfileAdmin.scss';
import moment from 'moment';
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAdminInfoAction, updateAdminInfoAction, updateAdminPwdAction, uploadAdminAvatarAction,
        updateSelectedMenuItemAction } from "../../../redux/actions/AdminAction";

function ProfileAdmin(props){
    const { admin_info } = useSelector((state) => state.AdminReducer);
    const dispatch = useDispatch();
    useEffect(() =>{
        window.scrollTo(0, 0);
        dispatch(updateSelectedMenuItemAction('profile-admin'));
    }, []);
    const [newInfo, setNewInfo] = useState({
        fullname: admin_info.fullname,
        email: admin_info.email,
        phone: admin_info.phone,
        birthday: moment(admin_info.birthday).format("YYYY-MM-DD"),
        gender: admin_info.gender
    }); 
    const [avatar, setAvatar] = useState(null);
    const [passwordData, setPasswordData] = useState({
        c_password: "",
        n_password: "",
        cf_password: ""
    });
    const [updateSuccess, setUpdateSuccess] = useState(false); // State for success message
    const [updateFail, setUpdateFail] = useState(false);

    const handleUpdate = async () => {
        await dispatch(updateAdminInfoAction(admin_info.id_admin, newInfo));
        setUpdateSuccess(true);
        setTimeout(() => {
            setUpdateSuccess(false);
        }, 2000);
    };
    const handleUploadAvatar = async(e) =>{
        const selectedFile = e.target.files[0];
        if(selectedFile){
            const formData = new FormData();
            formData.append("dataUpload", selectedFile);
            try {
                const result = await dispatch(uploadAdminAvatarAction(admin_info.id_admin, formData));
                setAvatar(selectedFile);
            } catch (error) {
                console.log("error", error.response);
            }   
        }
    }
    const handleUpdatePwd = async () =>{
        if(passwordData.n_password === passwordData.cf_password){
            await dispatch(updateAdminPwdAction(admin_info.id_admin, passwordData));
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 2000);
        }
        else{
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(false);
            }, 2000);
        }
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
                            <input className="custom-form-control" id="email-input" value={newInfo.email} readOnly/>
                        </div>
                        <div className="custom-form-group custom-column phone-group">
                            <label>Phone</label>
                            <input className="custom-form-control" id="phone" value={newInfo.phone} onChange={(e) => setNewInfo({ ...newInfo, phone: e.target.value })}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group custom-column birthday-group">
                            <label>Birthday</label>
                            <input className="custom-form-control" id="birthday" value={newInfo.birthday} type='date' onChange={(e) => setNewInfo({ ...newInfo, birthday: e.target.value })}/>
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
                {updateFail && <span style={{ color: "red" }}>Update fail!</span>}
                
                <label htmlFor="avatarUpload" className="btn btn-primary ml-1 mt-2" id="btnUpload">Upload avatar</label>
                <input type="file" accept="image/*" id="avatarUpload" style={{ display: "none" }} onChange={handleUploadAvatar}/>
            </div>
            
            <div className='profile-form'>
                <div className='pwd-header'>
                    <h3 className='pwd-header-name'>Change Password</h3>
                </div>
                <div className="custom-form">
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Enter current password</label>
                            <input className="custom-form-control" onChange={(e) => setPasswordData({ ...passwordData, c_password: e.target.value })}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Enter new password</label>
                            <input className="custom-form-control" onChange={(e) => setPasswordData({ ...passwordData, n_password: e.target.value })}/>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="custom-form-group">
                            <label>Enter confirm password</label>
                            <input className="custom-form-control" onChange={(e) => setPasswordData({ ...passwordData, cf_password: e.target.value })}/>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary ml-1 mt-2" id="btnChange" onClick={handleUpdatePwd}>Change</button>
        </div>
    ) 
}

export default memo(ProfileAdmin);