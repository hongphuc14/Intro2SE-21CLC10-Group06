import placeholder from '../../placeholder-image.png'
import './StatisticCompany.scss';
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import TouristFreelancer from '../../Components/TouristBooking/TouristFreelancer'
import RatingStar from '../../Components/RatingReview/RatingStar';
import {Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {getGuideBookingByIdGuide, getGuideReviewByIdGuidebooking, getTourGuideByIdGuide } from '../../redux/actions/FreelancerAction'

function Review({img, name, date, rating, review}){
  img = img==="" ? placeholder : img

  return(
    <div className = "review">
      <img src={img} alt = "tourist-avatar"></img>
      <div>
        <p className = "review-name">{name}</p>
        <RatingStar numberStar={rating}/>
        <i className="fas fa-flag"></i>
        <i className="fas fa-comment-dots"></i>
      </div>
      <p className = "review-date">{date}</p>
      <p className = "review-line">{review}</p>
    </div>
  )
}

export default function StatisticsCompany(){
  const dispatch = useDispatch() 
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);

  const { user_login} = useSelector(state => state.BasicReducer)
  const { guide_info, guide_booking_by_id_guide, guide_review_by_id_booking} = useSelector(state => state.FreelancerReducer)
  const [tourists, setTourists] = useState([])
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    if (guide_info === {})
      dispatch(getTourGuideByIdGuide(user_login.email))
  },[] )

  useEffect(() => {
    if (guide_info?.id_guide) {
        dispatch(getGuideBookingByIdGuide(guide_info.id_guide))
        dispatch(getGuideReviewByIdGuidebooking(guide_info.id_guide))
    }
  }, [guide_info.id_guide])

  useEffect(() => {
    setTourists([...guide_booking_by_id_guide]);
  },[guide_booking_by_id_guide])

  const importAvatar = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
    return path
  }

  // console.log(guide_booking_by_id_guide)
  // console.log(guide_booking_by_id_guide.length)

  // let totalSale = 0;
  // for (const item of tourists) {
  //   totalSale += item.price
  // }

  const totalSale = tourists.reduce((accumulator, tourist) => accumulator + tourist.price, 0)
  const validReview = reviews.length > 0 ? reviews.filter(review => review.rating) : []
  let averageRating = validReview.reduce((accumulator,review) => accumulator + review.rating, 0) 
  if (averageRating.length > 0) 
    averageRating = averageRating / averageRating.length
  
  return(
    <div className = "statistics-freelancer">
        <HeaderCompany/>
        <NavbarCompany src = {importAvatar(guide_info.avatar) || placeholder} fullname = {guide_info?.fullname?.toUpperCase()} flag3 = "focus"/>  
        <div className = "main-statistic">
          <div className = "statistic">
            <div className = "sale">
              <i className="fas fa-dollar-sign"></i>
              <p className = "title">TOTAL SALES</p>
              <p className = "data">{totalSale}</p>
              <p className = "des">$</p>
            </div>
            <div className = "booking">
              <i className="fas fa-cart-plus"></i>
              <p className = "title">TOTAL BOOKINGS</p>
              <p className = "data">{tourists.length}</p>
              <p className = "des">BOOKINGS</p>
            </div>
            <div className = "rating">
              <i className="fas fa-star"></i>
              <p className = "title">AVERAGE RATINGS</p>
              <p className = "data">{averageRating}</p>
              <p className = "des">(100 RATINGS)</p>
            </div>
          </div>

          <div className = "hr"></div>

          <div className = "tourist-section">
            <p>BOOKINGS</p>
            <div className = "select">
              <div className = "check-box-calendar">
                  <input id = "select-pending" type = "checkbox" name = "status" value = "pending"></input>
                  <label htmlFor="select-pending">Pending</label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-aprroved" type = "checkbox" name = "status" value = "approved"></input>
                  <label htmlFor="select-aprroved">Approved</label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-completed" type = "checkbox" name = "status" value = "completed"></input>
                  <label htmlFor="select-completed">Completed</label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-canceled" type = "checkbox" name = "status" value = "canceled"></input>
                  <label htmlFor="select-canceled">Canceled</label>
              </div>
            </div>
            <div className = "tourist-list">
              {
                tourists.map(tourist =>{
                  return (
                    <Link key={tourist.id_tourist} style={{ textDecoration: 'none' }}
                     to = {{pathname: "/booking-freelancer", state: {info: tourist}}}>
                      <TouristFreelancer key={tourist.id_tourist} {...tourist}/>
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
                  <input id = "select-5" type = "checkbox" name = "star" value = "5"></input>
                  <label htmlFor="select-5">
                    <RatingStar numberStar = {5}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-4" type = "checkbox" name = "star" value = "4"></input>
                  <label htmlFor="select-aprroved">
                    <RatingStar numberStar = {4}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-3" type = "checkbox" name = "star" value = "3"></input>
                  <label htmlFor="select-3">
                    <RatingStar numberStar = {3}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-2" type = "checkbox" name = "star" value = "2"></input>
                  <label htmlFor="select-2">
                    <RatingStar numberStar = {2}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-1" type = "checkbox" name = "star" value = "1"></input>
                  <label htmlFor="select-1">
                    <RatingStar numberStar = {1}/>
                  </label>
              </div>
              <div className = "check-box-calendar">
                  <input id = "select-0" type = "checkbox" name = "star" value = "0"></input>
                  <label htmlFor="select-0">
                    <RatingStar numberStar = {0}/>
                  </label>
              </div>
            </div>
            <div className = "review-list">
              {
                reviews.map(review =>{
                  return <Review key={review.id} {...review}/>
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}