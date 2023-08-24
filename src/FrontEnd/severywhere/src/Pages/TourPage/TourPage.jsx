import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import RatingStar from '../../Components/RatingReview/RatingStar';
import placeholder from '../../placeholder-image.png'

import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getTourSearch, getGuideSearch} from '../../redux/actions/TouristAction'
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

    const location = useLocation()
    const {info} = location?.state || {}
    console.log(info)

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

    // add tour
    // make report 

    return (  
        <div id="tour-page">
            <HeaderGuest />
            <div className="tour-info">
              <div>
                <p className = "name">{info.name}</p>
                <i class="fa-solid fa-location-dot"></i>
                <p className = "destination">{info.destination}</p>
                <i class="fa-solid fa-building"></i>
                <p className = "company">{info.company}</p>
                <RatingStar numberStar={Math.floor(info.rating)}/>
                <p className = "review">({info.num_review} reviews)</p>
                <div className = "container-smaller">
                  <Info title = "Cost per person" info = {info.price+"$"} icon = "fa-solid fa-language"/>
                  <Info title = "Duration" info ={info.duration + (info.duration > 1 ? " days" : " day")} icon = "fa-solid fa-clock"/>
                  <Info title = "Max people" info = {info.num_max} icon = "fa-solid fa-user-group"/>
                </div>
                <button>Add to cart <i class="fa-solid fa-cart-plus"></i></button>
                <i className="fa-regular fa-heart"></i>
                <i class="fa-regular fa-flag"></i>
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