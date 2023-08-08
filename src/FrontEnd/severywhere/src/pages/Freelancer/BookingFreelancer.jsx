import placeholder from '../../placeholder-image.png'
import './BookingFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import { useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';

const tourist = {id_tourist: 1, fullname: "PHAN MY LINH", birthday: "2010-10-20", gender: 1, phone: "0000000",
                email: "phmyxlinh@gmail.com", meeting_point: "227 Nguyen Van Cu Street, District 5, Ho Chi Minh City"}

export default function BookingFreelancer(){
    const { guide_info} = useSelector(state => state.FreelancerReducer)

    const location = useLocation()
    window.history.replaceState(null, null, location.pathname);
    let {id_guidebooking} = location?.state ? location?.state : {}

    const importAvatar = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
        return path
      }

    return(
        <div className = "booking-freelancer">
            <HeaderFreelancer/>
            <NavbarFreelancer src = {importAvatar(guide_info.avatar || placeholder)} fullname = {guide_info.fullname.toUpperCase()} flag3 = "focus"/>  
            <div className = "main-booking">
              <div className = "tourist-booking">
                <div className = "tourist-info">
                  <div className = "input-field">
                    <label>Fullname</label>
                    <input value = {tourist.fullname}  />
                  </div>
                  <div className = "input-field">
                    <label>Date of birth</label>
                    <input type = "date" value = {tourist.birthday} readonly/>
                  </div>
                  <div className = "check-box">
                    <legend> Gender</legend>
                    <input type = "radio" checked ={parseInt(tourist.gender) === 0 || false} ></input>
                    <label >Male</label>
                    <input type = "radio" checked ={parseInt(tourist.gender) === 1 || false}></input>
                    <label >Female</label>
                  </div>
                  <div className = "input-field">
                    <label>Phone number</label>
                    <input value = {tourist.phone}  />
                  </div>
                  <div className = "input-field">
                    <label>Email address</label>
                    <input value = {tourist.email} />
                  </div>
                  <div className = "input-field">
                    <label>Meeting point</label>
                    <input value = {tourist.meeting_point} />
                  </div>
                </div>
                <div className = "hr"></div>
              </div>
            <Link to= "/statistics-freelancer">
              <ButtonUploadFreelancer className="button-upload" title = "BACK" />
            </Link>
            </div>
        </div>
    )
}