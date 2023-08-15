import "./NavBar.scss"
import React, { useState, useEffect } from 'react';
import defaultAvatar from './defaultImage.jpg'
const NavBar = () => {
    const [profileImage, setProfileImage] = useState(defaultAvatar);
    const [profileName, setProfileName] = useState("Minh Minh"); // Default value
    const [profileEmail, setProfileEmail] = useState("ntmminh21@clc.fitus.edu.vn"); // Default value

    useEffect(() => {
        // Fetch user profile data from the backend
        fetch('your_backend_profile_data_endpoint')
            .then(response => response.json())
            .then(data => {
                if (data.name) {
                    setProfileName(data.name);
                }
                if (data.email) {
                    setProfileEmail(data.email);
                }
                if (data.profileImage) {
                    setProfileImage(data.profileImage);
                }
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, []);
    return (
        <nav className="sidebar">
            <div className="user-profile">
                <div className="profile-image">
                    <img src={profileImage} alt="User Profile"/>
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