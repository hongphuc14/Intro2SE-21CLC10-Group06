import React, { useState, useRef, useEffect } from 'react';
import './Avatar.scss';
import defaultImage from './defaultImage.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {getTouristInfo, updateTouristAvatar} from '../../redux/actions/TouristAction'
const Avatar = () => {
  const dispatch = useDispatch()
  const {user_login} = useSelector(state => state.BasicReducer)
  const {tourist_info} = useSelector(state => state.TouristReducer)

  // const [avatarUrl, setAvatarUrl] = useState(tourist_info?.avatar); // State to store the avatar URL
  const fileInputRef = useRef(null); // Reference to the file input element

  useEffect(() => {
    if(!tourist_info.id_tourist){
      dispatch(getTouristInfo(user_login.email))
    }
  }, [tourist_info.id_tourist])

  // useEffect(() => {
  //   if(tourist_info.id_tourist){
  //     try{
  //       const path = require(`../../../../../BackEnd/public/tourist_avatar/${tourist_info.avatar}`)
  //       setAvatarUrl(path)
  //     }
  //     catch(err){
  //       console.log(err)
  //     }
  //   }
  // }, [tourist_info.id_tourist])

  const handleAvatarChange = () => {
    const file = fileInputRef.current.files[0];

    // if (file) {
    //   const newAvatarUrl = URL.createObjectURL(file);
    //   setAvatarUrl(newAvatarUrl);
    // }

    dispatch(updateTouristAvatar(tourist_info.id_tourist, file))
  };

  const importAvatar = () => {
    try{
      const path = require(`../../../../../BackEnd/public/tourist_avatar/${tourist_info.avatar}`)
      return path
    }
    catch(err){
      console.error(err);
    }
  }

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="avatar-container">
      <div className="avatar-circle" onClick={openFilePicker}>
        {tourist_info?.avatar ? (
          <>
            <div className="change-avatar-text">Change Avatar</div>
            <img src={importAvatar()} alt="Avatar" className="avatar-image" />
          </>
        ) : (
          <div className="change-avatar-text">Change Avatar</div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Avatar;
