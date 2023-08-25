import './CheckoutGuide.scss'
import React, { useState, useEffect } from 'react'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
import placeholder from '../../placeholder-image.png'
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer'
import RatingStar from '../../Components/RatingReview/RatingStar'
import { useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getTouristInfo, bookGuide} from '../../redux/actions/TouristAction'

const CheckoutGuide = () => {
    const location = useLocation()
    const {info} = location?.state || {}
    console.log(info)

    const dispatch = useDispatch()
    const {user_login} = useSelector(state => state.BasicReducer)
    const {tourist_info} = useSelector(state => state.TouristReducer)
  
    const formatDate = (value, days = 0) => { 
        const formatDate = new Date(value)
        formatDate.setDate(formatDate.getDate() + days); // Add the desired number of days

        const year = formatDate.getFullYear();
        const month = String(formatDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        const day = String(formatDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
      };

    const [date, setDate] = useState(0);
    const [session, setSession] = useState(1);
    const [meeting, setMeeting] = useState("");
  
    useEffect(() => {
      dispatch(getTouristInfo(user_login.email))
    },[] )

    const importPhoto = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return placeholder
        try{
          const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
          return path}
        catch (err) {
          return placeholder
        }
      }

    const handleConfirm = () => {
        if (!meeting)
            alert("The meeting point field is required")
        else{
            const obj = {
                id_guide: info.id_guide,
                date: info.times[date].date,
                session: parseInt(session),
                meeting_point: meeting,
                booking_date: formatDate(new Date()),
                price: info.price
            }
            dispatch(bookGuide(tourist_info.id_tourist, obj))

            window.history.replaceState(null, null, "/");
            window.location.href = "/editprofile"
        }
    }

    return (  
        <div id="checkout-guide-page">
            <HeaderGuest/>
            <div class="checkout-page-container">
                <div class="checkout-left-container">
                    <div class="guide-cart-card">
                        <div class="left-cart-container">
                            <div class="guide-ava">
                                <img src= {importPhoto(info.avatar)} alt="avatar-image" />
                            </div>
                        </div>
                        <div class="right-cart-container">
                            <div class="guide-name">
                                {info.fullname}
                            </div>
                            <div class="guide-rating">
                                <RatingStar numberStar = {parseInt(info.rating)}/>
                            </div>
                            <div class="guide-info-cost-container">
                                <div class="guide-info-container">
                                    <div class="guide-info">
                                        <i class="fas fa-briefcase"></i>
                                        <p>{info.experience} of experience</p>
                                    </div>
                                    <div class="guide-info">
                                        <i class="fas fa-globe"></i>
                                        <p>{info.language.join(', ')}</p>
                                    </div>
                                    <div class="guide-info">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <p>{info.destination}</p>
                                    </div>
                                </div>
                                <div class="guide-cost-container">
                                    <div class="fas fa-dollar-sign cost-icon"></div>
                                    <div>
                                        <div class="cost-title">Cost per session</div>
                                        <div class="cost">{info.price}</div>
                                    </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                    <div class="fillin-form">
                        <div class="fillin-components">
                            <div class="info-part special">
                                Select the date you want to book  
                                <select name = "date" onClick = {(e) => {setDate(parseInt(e.target.value))}}>
                                    {info.times.map((time, index) => {
                                        return(
                                            <option key = {time.date} value = {index}>{time.date}</option>
                                        )
                                    })
                                    }
                                </select>
                                
                            </div>
                            <div class="info-part special">
                                Select the session you want to book
                                <select name = "session" onChange = {(e) => {setSession(parseInt(e.target.value))}}>
                                {
                                    info.times[date].sessions.includes(1) && <option value = {1} name = "Morning">Morning (7:00 - 11:00)</option>
                                }
                                {
                                    info.times[date].sessions.includes(2) && <option value = {1} name = "Afternoon">Afternoon (13:00 - 17:00)</option>
                                }
                                {
                                    info.times[date].sessions.includes(3) && <option value = {1} name = "Evening">Evening (18:00 - 21:00)</option>
                                }
                                </select>
                            </div>
                        </div>
                        <div class="fillin-components">
                            <div class="info-part">
                                Fullname
                                <input type="text" value = {tourist_info.fullname} readOnly/>
                            </div>
                            <div class="info-part">
                                Email
                                <input type="text" value = {tourist_info.email} readOnly/>
                            </div>
                        </div>
                        <div class="fillin-components">
                            <div class="info-part">
                                Phone
                                <input type="text" value = {tourist_info.phone} readOnly/>
                            </div>
                            <div class="info-part">
                                Gender
                                <div class="checkbox-gender">
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
                        <div class="fillin-components">
                            <div class="info-not-part">
                                Meeting point<span>*</span>
                                <input type="text" placeholder = "The specific address where tour guide will pick you up" onChange = {(e) => {setMeeting(e.target.value)}}/>
                            </div>
                        </div>
                        <div class="fillin-components">
                            
                        </div>
                    </div>
                </div>
                <div class="checkout-right-container">
                    <h1>CHECK OUT</h1>
                    <p>SUMMARY</p>
                    <div class="price">
                        <p>Price:</p>
                        <p>${session * info.price}</p>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="total">
                        <p>Total:</p>
                        <p>${session * info.price}</p>
                    </div>
                    <ButtonUploadFreelancer title = "CONFIRM" className = "button-save" onClick = {handleConfirm}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
 
export default CheckoutGuide;