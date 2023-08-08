import placeholder from '../../placeholder-image.png'
import './StatisticsFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import TouristFreelancer from '../../Components/TouristBooking/TouristFreelancer'
import RatingStar from '../../Components/RatingReview/RatingStar';
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

function Review({img, name, date, rating, review}){
  img = img==="" ? placeholder : img

  return(
    <div className = "review">
      <img src={img} alt = "tourist-avatar"></img>
      <div>
        <p className = "review-name">{name}</p>
        <RatingStar numberStar={rating}/>
        <i class="fas fa-flag"></i>
        <i class="fas fa-comment-dots"></i>
      </div>
      <p className = "review-date">{date}</p>
      <p className = "review-line">{review}</p>
    </div>
  )
}



const reviews = [{id: 1, name: "ML", img: "", date: "12/07/2023", rating: 5, review: "The guide is so friendly!"},
                  {id: 2, name: "ML", img: ""},
                  {id: 3, name: "ML", img: ""},
                  {id: 4, name: "ML", img: ""},
                  {id: 5, name: "ML", img: ""},
                  {id: 6, name: "ML", img: ""},]

const tourists = [{id_tourist: 1, fullname: "ML", img: ""},
                  {id_tourist: 2, fullname: "ML", img: ""},
                  {id_tourist: 3, fullname: "ML", img: ""},
                  {id_tourist: 4, fullname: "ML", img: ""},
                  {id_tourist: 5, fullname: "ML", img: ""},
                  {id_tourist: 6, fullname: "ML", img: ""},
                  {id_tourist: 7, fullname: "ML", img: ""},
                  {id_tourist: 8, fullname: "ML", img: ""},
                  {id_tourist: 9, fullname: "ML", img: ""},
                  {id_tourist: 10, fullname: "ML", img: ""},
                  {id_tourist: 11, fullname: "ML", img: ""},
                  {id_tourist: 12, fullname: "ML", img: ""},]

export default function StatisticsFreelancer(){
  const { guide_info} = useSelector(state => state.FreelancerReducer)

  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);

  const importAvatar = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
    return path
  }

  return(
    <div className = "statistics-freelancer">
        <HeaderFreelancer/>
        <NavbarFreelancer src = {importAvatar(guide_info.avatar || placeholder)} fullname = {guide_info.fullname.toUpperCase()} flag3 = "focus"/>  
        <div className = "main-statistic">
          <div className = "statistic">
            <div className = "sale">
              <i class="fas fa-dollar-sign"></i>
              <p className = "title">TOTAL SALES</p>
              <p className = "data">100.000</p>
              <p className = "des">$</p>
            </div>
            <div className = "booking">
              <i class="fas fa-cart-plus"></i>
              <p className = "title">TOTAL BOOKINGS</p>
              <p className = "data">100</p>
              <p className = "des">BOOKINGS</p>
            </div>
            <div className = "rating">
              <i class="fas fa-star"></i>
              <p className = "title">AVERAGE RATINGS</p>
              <p className = "data">5.0</p>
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
                    <Link to = {{pathname: "/booking-freelancer", state: {id_guidebooking: tourist.id_tourist}}}>
                      <TouristFreelancer li={tourist.id_tourist} {...tourist}/>
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
                  return <Review li={review.id} {...review}/>
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}