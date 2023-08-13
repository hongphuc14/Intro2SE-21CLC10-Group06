import React from "react";

const AdminAvatar = ({ avatarFileName }) =>{
    const avatarUrl = `/src/BackEnd/public/admin_avatar/${avatarFileName}`;
    return <img src={avatarUrl} alt="avatar"/>
};

export default AdminAvatar;