import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/SideNavBar/NavBar';
import RatingStar from '../../Components/RatingReview/RatingStar';
import './MyGuide.scss'
import React, { useState, useEffect } from 'react'

const MyGuide = () => {
    return (  
        <div id="my-tourguide-page">
            <HeaderGuest className="headerGuest" />
            <div id="my-tourguide-page-container">
                <NavBar/>
                <div id="my-tourguide-container"> 
                    <h1>MY TOUR GUIDES</h1>

                    {/* TourGuide Card */}
                    <div className="my-tourguide-card-container">
                        <div className="upper-card">
                            <div className="left-card-container">
                                <div className="guide-ava">
                                    <img src="./img.jpg" alt="guide-avatar" />
                                </div>
                            </div>
                            <div className="right-card-container">
                                <button>Cancel</button>
                                <div className="guide-name">
                                    Ngo Ngoc Lien
                                </div>
                                <div className="guide-rating">
                                    <RatingStar numberStar = {4}/>
                                    <a>4.0</a>
                                </div>
                                <div className="guide-info-cost-container">
                                    <div className="guide-info-container">
                                        <div className="guide-info">
                                            <i className="fas fa-briefcase"></i>
                                            <p>8 years of experience</p>
                                        </div>
                                        <div className="guide-info">
                                            <i className="fas fa-globe"></i>
                                            <p>Vietnamese</p>
                                        </div>
                                        <div className="guide-info">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <p>Ho Chi Minh City</p>
                                        </div>
                                    </div>
                                    <div className="guide-cost-container">
                                        <div className="fas fa-dollar-sign cost-icon"></div>
                                        <div>
                                            <div className="cost-title">Cost per session</div>
                                            <div className="cost">$52.00</div>
                                        </div>
                                    </div>
                                </div>
                
                            </div>
                        </div>
                        <div className="lower-card">
                            <div className="fillin-components">
                                <div className="info-part">
                                    Date:
                                    <a>25/7/2023</a>
                                </div>
                                <div className="info-part">
                                    Session:
                                    <a>Morning (7:00 - 11:00)</a>
                                </div>
                            </div>
                            <div className="fillin-components">
                                
                                <div className="info-part">
                                    Fullname
                                    <input type="text" value = "Phan My Linh" disabled/>
                                </div>
                                <div className="info-part">
                                    Email
                                    <input type="text" value = "phanmyxlinh@gmail.com" disabled/>
                                </div>
                            </div>
                            <div className="fillin-components">
                                <div className="info-part">
                                    Phone
                                    <input type="text" value = "090 123 4567" disabled/>
                                </div>
                                <div className="info-part">
                                    Gender
                                    <div className="checkbox-gender">
                                        <label>
                                            <input type="radio" name ="genderinfo" checked ="false" disabled/>
                                            Male
                                        </label>

                                        <label>
                                            <input type="radio" name ="genderinfo" checked = "true" disabled/>
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="fillin-components">
                                <div className="info-not-part">
                                    Meeting point
                                    <input type="text" placeholder = "The specific address where tour guide will pick you up" disabled/>
                                </div>
                            </div>
                            <div className="show-total">
                                Total:
                                <a>$52.00</a> 
                            </div>
                            <div className="date-status-container">
                                <div className="date">
                                    Booking date: 01/07/2023
                                </div>
                                <div className="status">
                                    Booked
                                </div>  
                            </div>
                        </div>
                       
                    </div>
                    
                    {/* TourGuide Card */}

                    {/* TourGuide Card */}
                
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
 
export default MyGuide;