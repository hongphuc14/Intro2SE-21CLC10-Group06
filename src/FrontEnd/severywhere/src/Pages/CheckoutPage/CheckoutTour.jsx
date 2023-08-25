import './CheckoutTour.scss'
import React, { useState, useEffect } from 'react'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
import placeholder from '../../placeholder-image.png'
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer'
import { useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getTouristInfo, bookTour} from '../../redux/actions/TouristAction'
const  CheckoutPage= () => {
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

    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date(), info.duration));
    const [num_ticket, setTicket] = useState(1);
  
    useEffect(() => {
      dispatch(getTouristInfo(user_login.email))
    },[] )

    const importPhoto = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return placeholder
        try{
          const path = require(`../../../../../BackEnd/public/tour/${filename}`)
          return path}
        catch (err) {
          return placeholder
        }
      }

    const handleChangeDate = (value, days) => {
        const d1 = new Date();
        const d2 = new Date(value);

        if (d1 > d2) {
            alert('Please select a date after today')
        }
        else{
            setStartDate(value); 
            const enddate = formatDate(value, days)
            setEndDate(enddate);
        }
    }

    const handleConfirm = () => {
        const obj = {
            id_tour: info.id_tour,
            start_date: startDate,
            end_date: endDate,
            booking_date: new Date(),
            num_tourist: num_ticket,
            total_price: num_ticket * info.price,
        }
        dispatch(bookTour(tourist_info.id_tourist, obj))

        window.history.replaceState(null, null, "/");
        window.location.href = "/editprofile"
        
    }

    return ( 
        <div className = "checkout-page">
            <HeaderGuest/>
            <div id="checkout-box">
                <div id="checkout">
                    <div id="checkout-infotour">
                        <div id="tour-image">
                            <img src= {importPhoto(info.photo_path)} alt="" />
                        </div>
                        <div id="tour-info">
                            <div id="tour-name">
                                <h1>{info.name}</h1>
                            </div>
                            <div>
                                <div id="tour-locate">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>{info.destination}</p>
                                </div>
                                <div id="tour-company">
                                    <i class="fa-solid fa-building"></i>
                                    <p>{info.company}</p>
                                </div>
                                <div id="rating-star">
                                    <i class="fa-solid fa-star"></i>
                                    <p>{parseInt(info.rating)}</p>
                                </div>
                                <div className='subcategory'>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-dollar-sign"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Cost</p>
                                            <p class="sub_val">{info.price}$</p>
                                        </div>
                                    </div>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-clock"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Duration</p>
                                            <p class="sub_val"> {info.duration} days</p>
                                        </div>
                                    </div>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-umbrella-beach"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Type</p>
                                            <p class="sub_val"> {info.category.charAt(0).toUpperCase() + info.category.slice(1)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="customer-info">
                        <div id="info_one">
                            <div id="info_name">
                                <p>Fullname</p>
                                <input type="text" value = {tourist_info.fullname} readOnly/>
                            </div>
                            <div id="info_email">
                                <p>Email</p>
                                <input type="text" value = {tourist_info.email} readOnly/>
                            </div>
                        </div>
                        <div id="info_two">
                            <div id="info_phone">
                                <p>Phone</p>
                                <input type="phone" value = {tourist_info.phone} readOnly/>
                            </div>
                            <div id="info_gender">
                                <p>Gender</p>
                                <div id="checkboxGender">
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
                        <div id="info_three">
                            <div id="info_startdate">
                                <p>Start date</p>
                                <input type="date" value = {startDate} onChange = {(e) => {handleChangeDate(e.target.value, info.duration)}}/>
                            </div>
                            <div id="info_enddate">
                                <p>End date</p>
                                <input type="date" value = {endDate}/>
                            </div>
                        </div>
                        <div id="info_four">
                            <div id="infoticket">
                                <p>Number of tickets:</p>
                                <input type="number" min={1} value = {num_ticket} onChange = {(e) => {
                                    console.log(e.target.value)
                                    if (e.target.value !== "0" && e.target.value !== "") 
                                        setTicket(e.target.value)
                                    else
                                        alert("The minimum number of tickets is 1")} }/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='checkout-right-container'>
                <h1>CHECK OUT</h1>
                    <p>SUMMARY</p>
                    {/* <div class="price">
                        <p>Price:</p>
                        <p>$52.00</p>
                    </div> */}
                    <div class="horizontal-line"></div>
                    <div class="total">
                        <p>Total:</p>
                        <p>{num_ticket * info.price}$</p>
                    </div>
                    <ButtonUploadFreelancer title = "CONFIRM" className = "button-save" onClick = {handleConfirm}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
 
export default CheckoutPage;