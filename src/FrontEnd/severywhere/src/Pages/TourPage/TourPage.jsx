import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import RatingStar from '../../Components/RatingReview/RatingStar';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import placeholder from '../../placeholder-image.png'

import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getTouristInfo, reportTour} from '../../redux/actions/TouristAction'
import { useEffect,useState } from 'react';
import './TourPage.scss';

const Info = ({title, info, icon}) => {
  return (
    <div className = "smaller-info">
      <i class={icon}></i>
      <p className = "title">{title}</p>
      <p className = "info">{info}</p>
    </div>
  )
}

export default function TourPage() {
    const dispatch = useDispatch()
    // window.history.replaceState(null, null, "/search");
    const {user_login} = useSelector(state => state.BasicReducer)
    const {tourist_info} = useSelector(state => state.TouristReducer)
    
    useEffect(() => {
      if (user_login)
        dispatch(getTouristInfo(user_login.email))
    },[] )

    const location = useLocation()
    const {info} = location?.state || {}
    // console.log(info)

    const importPhoto = (filename, folder) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        try{
          const path = require(`../../../../../BackEnd/public/${folder}/${filename}`)
          return path}
        catch (err) {
          return null
        }
      }

    // console.log(tourist_info)

    const updateTourCart = () => {
      if (!tourist_info?.id_tourist){
        // window.history.pushState(null, null,"/login")
        console.log("1")
        window.location.href = "/login"
      }
      else
        console.log("1")
        // dispatch(updateTourCart(info.id_tour))
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
  
        console.log(report)
        dispatch(reportTour(tourist_info.id_tourist, info.id_tour, report, formattedDate))
        setIsReport(false)
        setReport("")
      }
    }

    return (  
        <div id="tour-page">
            <HeaderGuest />
            <div className="tour-info">
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

              <div>
                <p className = "name">{info.name}</p>
                <i class="fa-solid fa-location-dot"></i>
                <p className = "destination">{info.destination}</p>
                <i class="fa-solid fa-building"></i>
                <p className = "company">{info.company}</p>
                <RatingStar numberStar={Math.floor(info.rating)}/>
                <p className = "review">({info.num_review} reviews)</p>
                <div className = "container-smaller">
                  <Info title = "Cost per person" info = {info.price+"$"} icon = "fa-solid fa-credit-card"/>
                  <Info title = "Duration" info ={info.duration + (info.duration > 1 ? " days" : " day")} icon = "fa-solid fa-clock"/>
                  <Info title = "Max people" info = {info.num_max} icon = "fa-solid fa-user-group"/>
                </div>
                <Link to = {{pathname: "/checkoutTour", state: {info: info}}} style = {{textDecoration: "none"}} >
                  <button >Checkout <i class="fa-solid fa-cart-plus"></i></button>
                </Link>
                
                <i className="fa-regular fa-heart" ></i>
                <i class="fa-regular fa-flag" onClick = {() => {
                  if (!tourist_info.id_tourist)
                    window.location.href = "/login"
                  else 
                    setIsReport(true)
                  }}></i>
              </div>
              <img src = {importPhoto(info.photo_path, "tour") || placeholder}></img>
            </div>
            <div className="tour-description">
              <div className = "description">
                <p className = "title">Description</p>
                <p>{info.description}</p>
              </div>
              <div className = "included">
                <p className = "title">What's included</p>
                <p>{info.included}</p>
              </div>
              <div className = "not-included">
                <p className = "title">What's not included</p>
                <p>{info.not_included}</p>
              </div>
              <div className = "tour-plan">
                <p className = "title">Tour plan</p>
                <button disabled = {!info.schedule} onClick = {() => window.open(info.schedule, '_blank')}>See detail</button>
              </div>
              <div className = "location">
              <p className = "title">Location</p>
                <p></p>
              </div>
              <div className = "contact">
                <p className = "title">Contact</p>
                <p>
                  <i class="fa-solid fa-phone"></i>
                  {info.phone}
                </p>
              </div>
              <div className = "tour-review">
                {
                  info?.tourist_reviews?.map (review =>{
                    // const {id_tour_booking, avatar, fullname, rating, review, review_date} = info.tourist_reviews;
                    return (
                      <div key = {review.id_tour_booking} className = "review-card">
                        <img src={importPhoto(review.avatar, "tourist_avatar")} alt = "tourist-avatar"></img>
                        <div>
                          <p className = "review-card-name">{review.fullname}</p>
                          <RatingStar numberStar={review.rating}/>
                        </div>
                        <p className = "review-card-date">{review.review_date ? new Date(review.review_date).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB")}</p>
                        <p className = "review-card-line">{review.review}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <Footer />
        </div>
    );
}
 
// export default Search;