import React, { useState, useRef } from 'react';
import './Avatar.scss';
import defaultImage from './defaultImage.jpg'

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState(defaultImage); // State to store the avatar URL
  const fileInputRef = useRef(null); // Reference to the file input element

  const handleAvatarChange = () => {
    const file = fileInputRef.current.files[0];

    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarUrl(newAvatarUrl);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="avatar-container">
      <div className="avatar-circle" onClick={openFilePicker}>
        {avatarUrl ? (
          <>
            <div className="change-avatar-text">Change Avatar</div>
            <img src={avatarUrl} alt="Avatar" className="avatar-image" />
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

