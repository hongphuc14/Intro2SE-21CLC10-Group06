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

    const [date, setDate] = useState(formatDate(new Date()));
    const [session, setSession] = useState([]);
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

    // const handleChangeDate = (value, days) => {
    //     const d1 = new Date();
    //     const d2 = new Date(value);

    //     if (d1 > d2) {
    //         alert('Please select a date after today')
    //     }
    //     else{
    //         setStartDate(value); 
    //         const enddate = formatDate(value, days)
    //         setEndDate(enddate);
    //     }
    // }

    const handleConfirm = () => {
        const obj = {
            id_guide: info.id_guide,
        //     start_date: startDate,
        //     end_date: endDate,
        //     booking_date: new Date(),
        //     num_tourist: num_ticket,
        //     total_price: num_ticket * info.price,
        }
        dispatch(bookGuide(tourist_info.id_tourist, obj))

        window.history.replaceState(null, null, "/");
        window.location.href = "/editprofile"
    }

    return (  
        <div id="checkout-guide-page">
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
                            <div class="info-part">
                                Fullname
                                <input type="text" value = {tourist_info.fullname} />
                            </div>
                            <div class="info-part">
                                Email
                                <input type="text" value = {tourist_info.email} />
                            </div>
                        </div>
                        <div class="fillin-components">
                            <div class="info-part">
                                Phone
                                <input type="text" value = {tourist_info.phone} />
                            </div>
                            <div class="info-part">
                                Gender
                                <div class="checkbox-gender">
                                    <label>
                                        <input type="radio" name ="genderinfo" checked = {tourist_info.gender === 0}/>
                                        Male
                                    </label>

                                    <label>
                                        <input type="radio" name ="genderinfo" checked = {tourist_info.gender === 1}/>
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="fillin-components">
                        <div class="info-not-part">
                                Meeting point
                                <input type="text" placeholder = "The specific address where tour guide will pick you up" onChange = {(e) => {setMeeting(e.target.value)}}/>
                            </div>
                        </div>
                        {/* <div class="show-total">
                            Total:
                            <a>$52.00</a> 
                        </div> */}
                    </div>
                </div>
                <div class="checkout-right-container">
                    <h1>CHECK OUT</h1>
                    <p>SUMMARY</p>
                    <div class="price">
                        <p>Price:</p>
                        <p>${session.length * info.price}</p>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="total">
                        <p>Total:</p>
                        <p>${session.length * info.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CheckoutGuide;