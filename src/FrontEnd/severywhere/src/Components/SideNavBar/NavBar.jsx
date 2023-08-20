import "./NavBar.scss"
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import defaultAvatar from './defaultImage.jpg'
const NavBar = () => {

    const {tourist_info} = useSelector(state => state.TouristReducer);
    const [profileImage, setProfileImage] = useState('');
    const [profileName, setProfileName] = useState(''); // Default value
    const [profileEmail, setProfileEmail] = useState(''); // Default value

    // useEffect(() => {
    //     // Fetch user profile data from the backend
    //     fetch('your_backend_profile_data_endpoint')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.name) {
    //                 setProfileName(data.name);
    //             }
    //             if (data.email) {
    //                 setProfileEmail(data.email);
    //             }
    //             if (data.profileImage) {
    //                 setProfileImage(data.profileImage);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching profile data:', error);
    //         });
    // }, []);

    const importAvatar =  (filename) =>  {
        if (typeof filename === 'undefined' || filename === "")
          return null
        // filename = "tourist_2.jpg"
        try{
          const path =  require(`../../../../../BackEnd/public/tourist_avatar/${filename}`)
          return path
        }
        catch(err){
          return null
        }
      }

    useEffect(() => {
        setProfileImage(tourist_info.avatar);
        setProfileName(tourist_info.fullname);
        setProfileEmail(tourist_info.email);
    }, [tourist_info]);

    return (
        <nav className="sidebar">
            <div className="user-profile">
                <div className="profile-image">
                    <img src={importAvatar(profileImage) || defaultAvatar} alt="User Profile"/>
                </div>
            </div>
            <div className="profile-name">
                {profileName}
                <div className="mail">
                    {profileEmail}
                </div>
            </div>
            <ul>
                <li>
                    <a href="/editprofile">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit Profile</span>
                    </a>
                </li>
                <li>
                    <a href="/changepw">
                        <i className="fa-solid fa-lock"></i>
                        <span>Password</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-heart heartedit"></i>
                        <span>Wishlist</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>Recent</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-comment-dots"></i>
                        <span>My Reviews</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-cart-shopping cartedit"></i>
                        <span>My Orders</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-window-close"></i>
                        <span>Cancelled</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
