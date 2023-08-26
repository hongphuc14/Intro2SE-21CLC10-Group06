import HeaderGuest from '../../Components/Header/HeaderGuest';
import Sidebar from "../../Components/SideNavBar/NavBar"
import Footer from '../../Components/Footer/Footer';
// import NavBar from '../../Components/SideNavBar/NavBar';
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer';
import placeholder from '../../placeholder-image.png'
import './MyGuide.scss'
// import React, { useState, useEffect } from 'react'
// import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getTouristInfo, getGuideBooking, cancelGuide, updateGuideReview} from '../../redux/actions/TouristAction'
import { useEffect,useState } from 'react';


const MyGuide = () => {
    const dispatch = useDispatch()
    const {user_login} = useSelector(state => state.BasicReducer)
    const {tourist_info, tour_booking, guide_booking} = useSelector(state => state.TouristReducer)

    useEffect(() => {
        if (user_login)
          dispatch(getTouristInfo(user_login.email))
    },[] )

    useEffect(() => {
        if (tourist_info.id_tourist)
            dispatch(getGuideBooking(tourist_info.id_tourist))
    },[tourist_info.id_tourist] )
  
    const importPhoto = (filename, folder) => {
        if (typeof filename === 'undefined' || filename === "")
          return placeholder
        try{
          const path = require(`../../../../../BackEnd/public/${folder}/${filename}`)
          return path}
        catch (err) {
          return placeholder
        }
      }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    const convertDateFormat = (dateString) =>  {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return 'Invalid Date';
        }
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }

    const isCompleted = (start_date, end_date, booking_date) => {
        const now = new Date(); // Current date and time
        const end = new Date(end_date);
        const start = new Date(start_date);
        const book = new Date(booking_date) // Specific target date

        // console.log(now, targetDateTime)
        if (book <= now && now < start) 
          return -1; // cancel
        else if (start < now && now <= end) 
          return 0; // no
        else if (end < now) 
          return 1; // review
    }


    const showStatus = (status, book) => {
        // const res = isCompleted(start, end, book)
        if (status === 1)
            return "Booked"
        else if (status == 5)
                return "Completed"
        else
            return "Canceled"
    }

    const handleCancelTour = (id_guidebooking) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;

        dispatch(cancelGuide(tourist_info.id_tourist, {id_guidebooking: id_guidebooking}))
    }

    const [no, setNo] = useState(0)
    const [isReport, setIsReport] = useState(false)
    const [report, setReport] = useState("")

    const [rating, setRating] = useState(0);
    const handleRatingChange = (selectedRating) => {
      setRating(selectedRating);
    };

    const saveReport = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
  
        // console.log(report)
        dispatch(updateGuideReview(tourist_info.id_tourist, {id_guidebooking: no, review: report, date, rating}))
        setIsReport(false)
        setReport("")
        setRating(0)
    }

    return (  
        <div id="my-tourguide-page">
            <HeaderGuest className="headerGuest" />
            <div id="my-tourguide-page-container">
                <Sidebar/>
                {
                    isReport && (
                    <div className = "report-section">
                        <div className = "report">
                        <p>Review</p>
                        <div className = "select-rating">
                            {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value}>
                                <input type="radio"name="rating"
                                value={value}
                                checked={rating === value}
                                onChange={() => handleRatingChange(value)}
                                style={{ display: 'none' }}
                                />
                                {rating >= value ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
                            </label>
                            ))}
                        </div>
                        <textarea value = {report} onChange = {(e) => {setReport(e.target.value)}}></textarea>
                        <ButtonUploadFreelancer className = "button-save" title = "BACK" onClick = {() => {setIsReport(false); setReport(""); setRating(0)}}/>
                        <ButtonUploadFreelancer className = "button-upload" title = "COMMIT" onClick = {saveReport}/>
                        </div>
                    </div>
                    )
                }
                <div id="my-tourguide-container"> 
                    <h1>My Tour Guides</h1>
                {
                    guide_booking.map(item =>{
                        return(
                            <div className="my-tourguide-card-container" key = {item.id_guidebooking}>
                            <div className="upper-card">
                                <div className="left-card-container">
                                    <div className="guide-ava">
                                        <img src={importPhoto(item.avatar,"freelancer_avatar") || placeholder} alt="guide-avatar" />
                                    </div>
                                </div>
                                <div className="right-card-container">

                                        {
                                            (item.status === 1) && 
                                            (<button onClick = {() => {handleCancelTour(item.id_guidebooking)}}>Cancel</button>)
                                        }
                                        {
                                            (item.status === 5) && (!item.review) && (!item.rating) &&
                                            (<button onClick = {() => {setNo(item.id_guidebooking); setIsReport(true)}}>Review</button>)
                                        }

                                    <div className="guide-name">
                                        {item.fullname}
                                    </div>
                                    <div className="guide-info-cost-container">
                                        <div className="guide-info-container">
                                            <div className="guide-info">
                                                <i className="fas fa-briefcase"></i>
                                                <p>{item.experience} of experience</p>
                                            </div>
                                            {/* <div className="guide-info">
                                                <i className="fas fa-globe"></i>
                                                <p>{}Vietnamese</p>
                                            </div> */}
                                            <div className="guide-info">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <p>{item.destination}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="guide-cost-container">
                                            <div className="fas fa-dollar-sign cost-icon"></div>
                                            <div>
                                                <div className="cost-title">Cost per session</div>
                                                <div className="cost">${item.price_per_session}</div>
                                            </div>
                                        </div>
                                    </div>
                    
                                </div>
                            </div>
                            <div className="lower-card">
                                <div className="fillin-components">
                                    <div className="above-info">
                                        Date:
                                        <a>{convertDateFormat(item.guide_date)}</a>
                                    </div>
                                    <div className="above-info">
                                        Session:
                                        {
                                            item.guide_session === 1 && <a>Morning (7:00 - 11:00)</a>
                                        }
                                        {
                                            item.guide_session === 2 && <a>Afternoon (7:00 - 11:00)</a>
                                        }
                                        {
                                            item.guide_session === 3 && <a>Evening (7:00 - 11:00)</a>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="fillin-components">
                                    
                                    <div className="info-part">
                                        Fullname
                                        <input type="text" value = {tourist_info.fullname} disabled/>
                                    </div>
                                    <div className="info-part">
                                        Email
                                        <input type="text" value = {tourist_info.email} disabled/>
                                    </div>
                                </div>
                                <div className="fillin-components">
                                    <div className="info-part">
                                        Phone
                                        <input type="text" value = {tourist_info.phone} disabled/>
                                    </div>
                                    <div className="info-part">
                                        Gender
                                        <div className="checkbox-gender">
                                            <label>
                                                <input type="radio" name ="genderinfo" checked = {tourist_info.gender === 0} disabled/>
                                                Male
                                            </label>
    
                                            <label>
                                                <input type="radio" name ="genderinfo" checked = {tourist_info.gender === 1} disabled/>
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="fillin-components">
                                    <div className="info-not-part">
                                        Meeting point
                                        <input type="text" value = {item.meeting_point} disabled/>
                                    </div>
                                </div>
                                <div className="show-total">
                                    Total:
                                    <a>${item.price}</a> 
                                </div>
                                <div className="date-status-container">
                              
                                        <p>Booking date: {convertDateFormat(item.booking_date)} </p>
                                    {
                                        item.status === 2 &&
                                        <p>Reason for cancellation: Company canceled the booking</p>
                                    }
                                    {
                                        item.status === 3 &&
                                        <p>Reason for cancellation: Tourist canceled the booking and wait for refund</p>
                                    }
                                    {
                                        item.status === 4 &&
                                        <p>Reason for cancellation: Tourist canceled the booking and no refund</p>
                                    }
                                    <p id ="status">{showStatus(item.status, item.booking_date)}</p>
                    
                                </div>
                            </div>
                           
                        </div>
                        )
                    })
                }
                </div>
                
            </div>
        </div>
    );
}
 
export default MyGuide;