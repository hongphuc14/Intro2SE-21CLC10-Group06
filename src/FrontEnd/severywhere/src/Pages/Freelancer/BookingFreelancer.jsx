import placeholder from '../../placeholder-image.png'
import './BookingFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import { useSelector, useDispatch } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import {getTourGuideByIdGuide, getGuideTimeByIdGuide, updateBookingStatus} from '../../redux/actions/FreelancerAction'

export default function BookingFreelancer(){
  const dispatch = useDispatch()
  const {user_login} = useSelector(state => state.BasicReducer)
  const { guide_info, guide_time_by_id_guide} = useSelector(state => state.FreelancerReducer)
  
  useEffect(() => {
    if (!guide_info.id_guide)
      dispatch(getTourGuideByIdGuide(user_login.email))
  },[] )

  useEffect(() => {
    if (guide_info?.id_guide) {
      dispatch(getGuideTimeByIdGuide(guide_info.id_guide))
    }
  }, [guide_info.id_guide])


  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);
  let {info, id_guide, list_tourist, list_checked} = location?.state ? location?.state : {}
  const info_tourist = info?.id_tourist_tourist

  const importAvatar = (filename) => {
      if (typeof filename === 'undefined' || filename === "")
        return null
      const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
      return path
  }

  const showSession = (id_guidetime) => {
    const result = guide_time_by_id_guide.find(time => time.id_guidetime === id_guidetime)
    const {guide_date, guide_session} = result || {}
    // console.log(guide_time_by_id_guide,result, info)
    const showDate = new Date(guide_date).toLocaleDateString("en-GB")
    switch (guide_session) {
      case 1:
        return showDate + " Morning"
      case 2:
        return showDate + " Afternoon"
      default:
        return showDate + " Evening"
    }

  }
  const showStatus = (status) => {
    switch (status) {
      case 1:
        return "Approved"
      case 5:
          return "Approved"
      default:
        return "Canceled"
    }
  }

  const saveStatus = (id_guidetime,status) => {
    const now = new Date(); 
    const result = guide_time_by_id_guide.find(time => time.id_guidetime === id_guidetime)
    const {guide_date} = result || {}
    const targetDateTime = new Date(guide_date);

    if (targetDateTime > now)
      alert("It is not completed")
    else
      dispatch(updateBookingStatus(id_guide, info.id_guidebooking, status))
  }

  return(
      <div className = "booking-freelancer">
          <HeaderFreelancer/>
          <NavbarFreelancer src = {importAvatar(guide_info.avatar) || placeholder} fullname = {guide_info?.fullname?.toUpperCase()} flag3 = "focus"/>  
          <div className = "main-booking">
            <div className = "tourist-booking">
              <div className = "tourist-info">
                <div className = "input-field">
                  <label>Fullname</label>
                  <input value = {info_tourist?.fullname} readOnly/>
                </div>
                <div className = "input-field">
                  <label>Date of birth</label>
                  <input type = "text" value = {new Date(info_tourist?.birthday).toLocaleDateString("en-GB")} readOnly/>
                </div>
                <div className = "check-box">
                  <legend> Gender</legend>
                  <input type = "radio" checked ={parseInt(info_tourist?.gender) === 0 || false} readOnly></input>
                  <label >Male</label>
                  <input type = "radio" checked ={parseInt(info_tourist?.gender) === 1 || false} readOnly></input>
                  <label >Female</label>
                </div>
                <div className = "input-field">
                  <label>Phone number</label>
                  <input value = {info_tourist?.phone} readOnly />
                </div>
                <div className = "input-field">
                  <label>Email address</label>
                  <input value = {info_tourist?.email} readOnly/>
                </div>
                <div className = "input-field">
                  <label>Meeting point</label>
                  <input value = {info?.meeting_point} readOnly/>
                </div>
              </div>

              <div className = "hr"></div>

              <div className = "booking-info">
                <div>
                  <p>Session: </p>
                  <p>{showSession(info?.id_guidetime)}</p>
                </div>
                <div>
                  <p>Booking date: </p>
                  <p> {new Date(info?.booking_date).toLocaleDateString("en-GB")}</p>
                </div>
                <div>
                  <p>Status: </p>
                  <p>{showStatus(info?.status)}</p>
                </div>
                <div>
                  <p>Price: </p>
                  <p>{info?.price}$</p>
                </div>
                {
                  info?.status !== 1 && info?.status !== 5 &&
                  (
                    <div>
                      <p>Reason for cancellation: </p>
                      {
                        info?.status === 2 ? (
                          <p>Tour guide canceled the booking 
                          and wait for refund</p>
                        ) :(
                          <p>Tourist canceled the booking and {info?.status === 3 ? "wait for" : "no"} refund</p>
                        )
                      }
                      
                    </div>
                  )
                }
              </div>
              {
                info?.status == 1 &&
                (
                  <div className = "booking-button">
                    <Link to= {{pathname: "/statistics-freelancer"}} >
                      <ButtonUploadFreelancer className="button-save" title = "CANCEL" onClick = {() => {saveStatus(info?.id_guidetime,2)}}/>
                    </Link>
                    <Link to= {{pathname: "/statistics-freelancer"}} >
                      <ButtonUploadFreelancer className="button-upload" title = "COMPLETE" onClick = {() => {saveStatus(info?.id_guidetime,5)}} />
                    </Link>
                  </div>
                )
              }
              {/* {
                info?.status === 1 &&
                (
                  <Link to= {{pathname: "/statistics-freelancer"}} >
                    <ButtonUploadFreelancer className="button-upload cancel" title = "CANCEL" onClick = {() => {saveStatus(2)}}/>
                  </Link>
                )
              } */}
            </div>
          <Link to= {{pathname: "/statistics-freelancer", state: {list_tourist, list_checked}}} >
            <ButtonUploadFreelancer className="button-upload" title = "BACK" />
          </Link>
          </div>
      </div>
  )
}