import placeholder from '../../placeholder-image.png'
import './StatisticsFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import TouristFreelancer from '../../Components/TouristBooking/TouristFreelancer'
import RatingStar from '../../Components/RatingReview/RatingStar';
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer';
import {Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {getGuideBookingByIdGuide, getGuideReviewByIdGuidebooking, getTourGuideByIdGuide,
  updateReply, updateReport } from '../../redux/actions/FreelancerAction'
import {getDestination} from '../../redux/actions/BasicAction'
export default function StatisticsFreelancer(){
  const dispatch = useDispatch() 
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);

  const { user_login, destination} = useSelector(state => state.BasicReducer)
  const { guide_info, guide_booking_by_id_guide, guide_review_by_id_booking} = useSelector(state => state.FreelancerReducer)

  useEffect(() => {
    if (!guide_info.id_guide){}
      dispatch(getTourGuideByIdGuide(user_login.email))
    if (destination?.length === 0)
      dispatch(getDestination())
  },[] )

  useEffect(() => {
    if (guide_info?.id_guide) {
        dispatch(getGuideBookingByIdGuide(guide_info.id_guide))
        dispatch(getGuideReviewByIdGuidebooking(guide_info.id_guide))
    }
  }, [guide_info.id_guide])

  let {list_tourist, list_checked} = location.state || {}
  const [tourists, setTourists] = useState((list_tourist &&[...list_tourist]) || [])
  const [isChecked, setIsChecked] = useState((list_checked && [...list_checked]) || [true,true])

  useEffect(() => {
    // console.log(tourists, "1")
      setTourists([...guide_booking_by_id_guide]);
  },[guide_booking_by_id_guide])

  const changeTourists = (status, no) => {
    const newChecked = [...isChecked]
    const isShow = isChecked[no]
    if (isShow) {
      const newList = tourists.filter(item => {
        if (status === 2)
          return item.status !== 2 && item.status !== 4 && item.status !== 3
        else
          return item.status !== 1 && item.status !== 5} )
      newChecked[no] = false
      setTourists(newList)
      // console.log(newList)
    }
    else{
      const tmp = guide_booking_by_id_guide.filter(item => {
      if (status === 2)
        return item.status === 2 || item.status === 3 || item.status === 4
      else 
        return item.status === 1 || item.status === 5} )
      const newList = [...tourists,...tmp]
      newChecked[no] = true
      setTourists(newList)
      // console.log(newList)
    }
    setIsChecked(newChecked)
    // console.log(typeof status)
  }

  const [reviews, setReviews] = useState([])
  useEffect(() => {
    setReviews([...guide_review_by_id_booking]);
  },[guide_review_by_id_booking])

  const [isSelected, setIsSelected] = useState([true,true,true,true,true,true])
  const changeReviews = (rating, no) => {
    const newSelected = [...isSelected]
    const isShow = isSelected[no]
    if (isShow) {
      const newList = reviews.filter(item => {
          return item.rating !== rating} )
      newSelected[no] = false
      setReviews(newList)
      // console.log(newList)
    }
    else{
      const tmp = guide_review_by_id_booking.filter(item => {
        return item.rating === rating} )
      const newList = [...reviews,...tmp]
      newSelected[no] = true
      setReviews(newList)
      // console.log(newList)
    }
    setIsSelected(newSelected)
    // console.log(typeof status)
  }
  const importAvatar = (folder, filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    try{
      const path = require(`../../../../../BackEnd/public/${folder}/${filename}`)
      return path
    }
    catch(err){
      return null
    }
      
    
  }

  const totalSale = guide_booking_by_id_guide.reduce((accumulator, tourist) => {
    if (tourist.status === 1 || tourist.status === 5)
      return accumulator + tourist.price
    else 
      return accumulator}, 0)
  const totalBooking = guide_booking_by_id_guide.reduce((accumulator, tourist) => {
    if (tourist.status === 1 || tourist.status === 5)
      return accumulator + 1
    else 
      return accumulator}, 0)
  const validReview = reviews.length > 0 ? reviews.filter(review => review.rating) : []
  let averageRating = validReview.reduce((accumulator,review) => accumulator + review.rating, 0) 
  if (validReview.length > 0) 
    averageRating = averageRating / validReview.length

  const [noReview, setNoReview] = useState(null)

  const [isReply, setIsReply] = useState(false)
  const [reply, setReply] = useState("")
  const saveReply = () => {
    if (reply === "")
      alert ("Please don't leave an empty reply or press the Back button.")
    else{
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      dispatch(updateReply(guide_info.id_guide, noReview, reply, formattedDate))
      setIsReply(false)
      setReply("")
    }
  }

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

      dispatch(updateReport(guide_info.id_guide, noReview, report, formattedDate))
      setIsReport(false)
      setReport("")
    }
  }

  return(
    <div className = "statistics-freelancer">
        <HeaderFreelancer/>
        <NavbarFreelancer src = {importAvatar("freelancer_avatar",guide_info.avatar) || placeholder} fullname = {guide_info?.fullname?.toUpperCase()} flag3 = "focus"/>  
        <div className = "main-statistic">
          {
            isReply && (
              <div className = "reply-section">
                <div className = "reply">
                  <p>Reply</p>
                  <textarea value = {reply} onChange = {(e) => {setReply(e.target.value)}}></textarea>
                  <ButtonUploadFreelancer className = "button-save" title = "BACK" onClick = {() => {setIsReply(false); setReply("")}}/>
                  <ButtonUploadFreelancer className = "button-upload" title = "COMMIT" onClick = {saveReply}/>
                </div>
              </div>
            )
          }
          {
            isReport && (
              <div className = "report-section">
                <div className = "report">
                  <p>Report</p>
                  <p>We're sorry something's wrong. How can we help you? </p>
                  <p>Please provide a detailed description of this issue.</p>
                  <textarea value = {report} onChange = {(e) => {setReport(e.target.value)}}></textarea>
                  <ButtonUploadFreelancer className = "button-save" title = "BACK" onClick = {() => {setIsReport(false); setReport("")}}/>
                  <ButtonUploadFreelancer className = "button-upload" title = "COMMIT" onClick = {saveReport}/>
                </div>
              </div>
            )
          }
          <div className = "statistic">
            <div className = "sale">
              <i className="fas fa-dollar-sign"></i>
              <p className = "title">TOTAL SALES</p>
              <p className = "data">{totalSale.toFixed(2)}</p>
              <p className = "des">$</p>
            </div>
            <div className = "booking">
              <i className="fas fa-cart-plus"></i>
              <p className = "title">TOTAL BOOKINGS</p>
              <p className = "data">{totalBooking}</p>
              <p className = "des">BOOKINGS</p>
            </div>
            <div className = "rating">
              <i className="fas fa-star"></i>
              <p className = "title">AVERAGE RATINGS</p>
              <p className = "data">{averageRating.toFixed(1)}</p>
              <p className = "des">({validReview.length} RATING{validReview.length > 1 && 'S'})</p>
            </div>
          </div>

          <div className = "hr"></div>

          <div className = "tourist-section">
            <p>BOOKINGS</p>
            <div className = "select">
              {/* <div className = "check-box-calendar">
                  <input id = "select-pending" type = "checkbox" name = "status" value = {1} checked = {isChecked[0]} onChange= {(e) => changeTourists(parseInt(e.target.value),0)}></input>
                  <label htmlFor="select-pending">Pending</label>
              </div> */}
              <div className = "check-box-calendar">
                  <input id = "select-aprroved" type = "checkbox" name = "status" value = {1} checked = {isChecked[0]} onChange= {(e) => changeTourists(parseInt(e.target.value),0)}></input>
                  <label htmlFor="select-aprroved">Approved</label>
              </div>
              {/* <div className = "check-box-calendar">
                  <input id = "select-completed" type = "checkbox" name = "status" value = {6} checked = {isChecked[2]} onChange= {(e) => changeTourists(parseInt(e.target.value),2)}></input>
                  <label htmlFor="select-completed">Completed</label>
              </div> */}
              <div className = "check-box-calendar">
                  <input id = "select-canceled" type = "checkbox" name = "status" value = {2} checked = {isChecked[1]} onChange= {(e) => changeTourists(parseInt(e.target.value),1)}></input>
                  <label htmlFor="select-canceled">Canceled</label>
              </div>
            </div>
            <div className = "tourist-list">
              {
                tourists.map(tourist =>{
                  return (
                    <Link key={tourist.id_guidebooking} style={{ textDecoration: 'none' }}
                     to = {{pathname: "/booking-freelancer", state: {info: tourist, id_guide: guide_info.id_guide, list_tourist: tourists, list_checked: isChecked}}}>
                      <TouristFreelancer key={tourist.id_guidebooking} {...tourist}/>
                    </Link>
                    )
                })
              }
            </div>
          </div>

          <div className = "hr"></div>

          <div className = "review-section">
            <p>RATINGS & REVIEWS</p>
            <div className = "select">
              <div className = "check-box-calendar">
                  <input id = "select-5" type = "checkbox" name = "star" value = "5" checked = {isSelected[5]} onChange= {(e) => changeReviews(parseInt(e.target.value),5)}></input>
                  <label htmlFor="select-5">
                    <RatingStar numberStar = {5}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-4" type = "checkbox" name = "star" value = "4" checked = {isSelected[4]} onChange= {(e) => changeReviews(parseInt(e.target.value),4)} ></input>
                  <label htmlFor="select-aprroved">
                    <RatingStar numberStar = {4}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-3" type = "checkbox" name = "star" value = "3" checked = {isSelected[3]} onChange= {(e) => changeReviews(parseInt(e.target.value),3)}></input>
                  <label htmlFor="select-3">
                    <RatingStar numberStar = {3}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-2" type = "checkbox" name = "star" value = "2" checked = {isSelected[2]} onChange= {(e) => changeReviews(parseInt(e.target.value),2)}></input>
                  <label htmlFor="select-2">
                    <RatingStar numberStar = {2}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-1" type = "checkbox" name = "star" value = "1" checked = {isSelected[1]} onChange= {(e) => changeReviews(parseInt(e.target.value),1)}></input>
                  <label htmlFor="select-1">
                    <RatingStar numberStar = {1}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-0" type = "checkbox" name = "star" value = "0" checked = {isSelected[0]} onChange= {(e) => changeReviews(parseInt(e.target.value),0)}></input>
                  <label htmlFor="select-0">
                    <RatingStar numberStar = {0}/>
                  </label>
              </div>
            </div>
            <div className = "review-list">
              {
                reviews.map(review =>{
                  // const { guide_review, id_guidebooking} = review
                  return (
                    <div key = {review.id_guidebooking} className = "review">
                      <img src={importAvatar("tourist_avatar",review.avatar)} alt = "tourist-avatar"></img>
                      <div>
                        <p className = "review-name">{review.fullname}</p>
                        <RatingStar numberStar={review.rating}/>
                        <i className="fas fa-flag" onClick = {() => {setIsReport(true); setNoReview(review.id_guidebooking)}}></i>
                        <i className="fas fa-comment-dots" onClick = {() => {setIsReply(true); setNoReview(review.id_guidebooking)}}></i>
                      </div>
                      <p className = "review-date">{new Date(review.review_date).toLocaleDateString("en-GB")}</p>
                      <p className = "review-line">{review.review}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}