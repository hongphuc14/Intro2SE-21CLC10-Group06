import "./MyTours.scss"
import Sidebar from "../../Components/SideNavBar/NavBar"
import HeaderGuest from "../../Components/Header/HeaderGuest"
import Footer from "../../Components/Footer/Footer"
import placeholder from '../../placeholder-image.png'
import { ButtonUploadFreelancer } from "../../Components/Button/ButtonFreelancer"

import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getTouristInfo, getTourBooking, cancelTour, updateReview} from '../../redux/actions/TouristAction'
import { useEffect,useState } from 'react';

const MyTours = () => {
    const dispatch = useDispatch()
    const {user_login} = useSelector(state => state.BasicReducer)
    const {tourist_info, tour_booking, guide_booking} = useSelector(state => state.TouristReducer)

    useEffect(() => {
        if (user_login)
          dispatch(getTouristInfo(user_login.email))
    },[] )

    useEffect(() => {
        dispatch(getTourBooking(tourist_info.id_tourist))
    },[tourist_info.id_tourist] )
  
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
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

    const showStatus = (status, start, end, book) => {
        const res = isCompleted(start, end, book)
        if (status === 1){
            if (res === -1 || res === 0)
                return "Booked"
            else if (res == 1)
                return "Completed"
            }
        else
            return "Canceled"
    }

    const cancelTour = (id_tour_booking) => {
        // dispatch(cancelTour(id_tour_booking))
    }

    const [no, setNo] = useState(0)
    const [isReport, setIsReport] = useState(false)
    const [report, setReport] = useState("")
    const saveReport = () => {
      if (report === "")
        alert ("Please don't leave an empty report or press the Back button.")
      else{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
  
        console.log(report)
        dispatch(updateReview(no, {report, formattedDate}))
        setIsReport(false)
        setReport("")
      }
    }

    return (
        <div id="MyTours">
            <HeaderGuest />
            <div className="container">
                <Sidebar />
                {
                    isReport && (
                    <div className = "report-section">
                        <div className = "report">
                        <p>Review</p>
                        {/* /rating */}
                        <textarea value = {report} onChange = {(e) => {setReport(e.target.value)}}></textarea>
                        <ButtonUploadFreelancer className = "button-save" title = "BACK" onClick = {() => {setIsReport(false); setReport("")}}/>
                        <ButtonUploadFreelancer className = "button-upload" title = "COMMIT" onClick = {saveReport}/>
                        </div>
                    </div>
                    )
                }
                <div className="mytour-content">
                    <div className="mytour-header">
                        <h1>My Tours</h1>
                    </div>
                    {
                    tour_booking.map(book => {
                        console.log(book)
                        return(
                        <>
                            <div key={book.id_tour_booking} className="tour_one">
                                <img src={book.is_deleted ? placeholder : importPhoto(book.photo_path)} alt="" />
                                <div id="tour-info">
                                    <div id="tour-name">
                                        <h2>{book.name}</h2> 
                                        {
                                            (book.status === 1) && (isCompleted (book.start_date, book.end_date) === -1) && 
                                            (<button onClick = {() => {cancelTour(book.id_tour_booking)}}>Cancel</button>)
                                        }
                                        {
                                            (book.status === 1) && (isCompleted (book.start_date, book.end_date) === 1) && 
                                            (<button onClick = {() => {setNo(book.id_tour_booking); setIsReport(true)}}>Review</button>)
                                        }
                                    </div>
                                    <div>
                                        <div id="tour-locate">
                                            <i class="fa-solid fa-location-dot"></i>
                                            <p>{book.destination}</p>
                                        </div>
                                        <div id="tour-company">
                                            <i class="fa-solid fa-building"></i>
                                            <p>{book.company}</p>
                                        </div>
                                        <div className='subcategory'>
                                            <div id="tour_subinfo">
                                                <i class="fa-solid fa-dollar-sign"></i>
                                                <div class="tourcontent_co">
                                                    <p class="sub_title"> Cost</p>
                                                    <p class="sub_val">${book.price}</p>
                                                </div>
                                            </div>
                                            <div id="tour_subinfo">
                                                <i class="fa-solid fa-clock"></i>
                                                <div class="tourcontent_co">
                                                    <p class="sub_title"> Duration</p>
                                                    <p class="sub_val">{book.duration} {book.duration > 1 ? "days" : "day"}</p>
                                                </div>
                                            </div>
                                            <div id="tour_subinfo">
                                                <i class="fa-solid fa-umbrella-beach"></i>
                                                <div class="tourcontent_co">
                                                    <p class="sub_title"> Type</p>
                                                    <p class="sub_val"> {book.category.charAt(0).toUpperCase() + book.category.slice(1)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="tour_two">
                                <div id="info_one">
                                    <div id="info_name">
                                        <p>Fullname</p>
                                        <input type="text" readOnly value={tourist_info.fullname} />
                                    </div>
                                </div>
                                
                                <div id="info_two">
                                    <div id="info_startdate">
                                        <p>Start date</p>
                                        <input type="date" value= {formatDate(book.start_date)} readOnly />
                                    </div>
                                    <div id="info_enddate">
                                        <p>End date</p>
                                        <input type="date" value= {formatDate(book.end_date)} readOnly/>
                                    </div>
                                </div>
                                <div id="info_three">
                                    <div id="infoticket">
                                        <p>Number of tickets:</p>
                                        <input type="number" value={book.num_tourist} readOnly/>
                                    </div>
                                    <div id="info_total">
                                        <p>Total:</p>
                                        <p id="totalpay">$ {book.total_price}</p>
                                    </div>
                                </div>
                                <div id="info_four">
                                    <p>Booking date: {new Date(book.booking_date).toLocaleDateString("en-GB")}</p>

                                    {
                                        book.status === 2 &&
                                        <p>Reason for cancellation: Company canceled the booking</p>
                                    }

                                    {
                                        book.status === 3 &&
                                        <p>Reason for cancellation: Tourist canceled the booking and wait for refund</p>
                                    }

{
                                        book.status === 4 &&
                                        <p>Reason for cancellation: Tourist canceled the booking and no refund</p>
                                    }

                                    <p id ="tour_status">{showStatus(book.status, book.start_date, book.end_date, book.booking_date)}</p>
                                    
                                </div>
                            </div>
                        </> 
                        )
                    }) 
                } 
                </div>
            </div>
            {/* <Footer /> */}
        </div>

    );
}

export default MyTours;