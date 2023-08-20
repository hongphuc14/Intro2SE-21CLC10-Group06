import placeholder from '../../placeholder-image.png'
import './BookingCompany.scss';
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer';
import {Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCompanyInfo, updateCompanyBooking} from '../../redux/actions/CompanyAction';

export default function BookingCompany(){
    const dispatch = useDispatch()
    const { user_login, destination } = useSelector(state => state.BasicReducer)
    const {company_info} = useSelector(state => state.CompanyReducer)

    const location = useLocation()
    window.history.replaceState(null, null, location.pathname);
    const {list} = location.state || {}
    console.log(list) 
  
    useEffect(() => {
        dispatch(getCompanyInfo(user_login.email))
    },[] )
  
    const isCompleted = (start_date, end_date) => {
        const now = new Date(); // Current date and time
        const targetDateTime = new Date(end_date);
        const targetDateTime2 = new Date(start_date); // Specific target date

        console.log(now, targetDateTime)
        if ((targetDateTime <= now) || (targetDateTime2 >= now)) 
          return false; // targetDate is in the past
        else 
          return true; // targetDate is the same as now
    }

    const importAvatar = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        try{
          const path = require(`../../../../../BackEnd/public/company_avatar/${filename}`)
          return path}
        catch (err) {
          return null
        }
      }

    const handleUpdateBooking = (id_tour_booking, status) => {
        dispatch(updateCompanyBooking(company_info.id_company, id_tour_booking, status))
    }

    const showStatus = (status) => {
        switch (status) {
          case 1:
            return "Approved"
          default:
            return "Canceled"
        }
      }

    return (
    <div className="booking-company">
      <HeaderCompany/>
      <NavbarCompany src = {importAvatar(company_info?.avatar) || placeholder} name = {company_info?.name?.toUpperCase()} flag3 = "focus"/>
      
      <div className = "main-booking">
        <Link to= "/statistics-company">
            <ButtonUploadFreelancer className="button-upload" title = "BACK" />
        </Link>
        {
          list?.map((item) =>{
            return (
              <div key = {item.id_tour_booking} className = "tour-booking">
                <div className = "tourist-booking">
                <div className = "tourist-info">
                    <div className = "input-field">
                    <label>Fullname</label>
                    <input value = {item?.fullname} readOnly/>
                    </div>
                    <div className = "input-field">
                    <label>Date of birth</label>
                    <input type = "text" value = {new Date(item?.birthday).toLocaleDateString("en-GB")} readOnly/>
                    </div>
                    <div className = "check-box">
                    <legend> Gender</legend>
                    <input type = "radio" checked ={parseInt(item?.gender) === 0 || false} readOnly></input>
                    <label >Male</label>
                    <input type = "radio" checked ={parseInt(item?.gender) === 1 || false} readOnly></input>
                    <label >Female</label>
                    </div>
                    <div className = "input-field">
                    <label>Phone number</label>
                    <input value = {item?.phone} readOnly />
                    </div>
                    <div className = "input-field">
                    <label>Email address</label>
                    <input value = {item?.email} readOnly/>
                    </div>
                </div>

                <div className = "hr"></div>

                <div className = "booking-info">
                    <div>
                    <p>Start date: </p>
                    <p>{new Date(item?.start_date).toLocaleDateString("en-GB")}</p>
                    </div>
                    <div>
                    <p>End date: </p>
                    <p>{new Date(item?.end_date).toLocaleDateString("en-GB")}</p>
                    </div>
                    <div>
                    <p>The number of tickets: </p>
                    <p>{item?.num_tourist}</p>
                    </div>
                    <div>
                    <p>Total price: </p>
                    <p>{item?.total_price}$</p>
                    </div>
                    <div>
                    <p>Booking date: </p>
                    <p>{new Date(item?.booking_date).toLocaleDateString("en-GB")}</p>
                    </div>
                    <div>
                    <p>Status: </p>
                    <p>{showStatus(item?.status)}</p>
                    </div>
                    {
                    ((item?.status !== 1)) &&
                    (
                        <div>
                        <p>Reason for cancellation: </p>
                        {
                            ((item?.status == 2)) ? (
                            <p>Company canceled the booking 
                            and wait for refund</p>
                            ) :(
                            <p>Tourist canceled the booking and {item?.status == 3 ? "wait for" : "no"} refund</p>
                            )
                        }
                        </div>
                    )
                    }
                </div>
                {
                    // item?.status == 1 &&
                    // (
                    // <div className = "booking-button">
                    //     <Link to= {{pathname: "/statistics-company"}} >
                    //     <ButtonUploadFreelancer className="button-save" title = "CANCEL" onClick = {() => {handleUpdateBooking(item.id_tour_booking, 2)}}/>
                    //     </Link>
                    //     <Link to= {{pathname: "/statistics-company"}} >
                    //     <ButtonUploadFreelancer className="button-upload" title = "COMPLETE" onClick = {() => {handleUpdateBooking(item.id_tour_booking, 3)}} />
                    //     </Link>
                    // </div>
                    // )
                }
                {
                    (item?.status === 1 && !isCompleted(item?.start_date, item?.end_date) ) &&
                    (
                    <Link to= {{pathname: "/statistics-company"}} >
                        <ButtonUploadFreelancer className="button-upload cancel" title = "CANCEL" onClick = {() => {handleUpdateBooking(item.id_tour_booking, 2)}}/>
                    </Link>
                    )
                }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    )
  }