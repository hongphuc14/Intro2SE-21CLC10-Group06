import HeaderAbout from '../../Components/Header/HeaderAbout';
import RatingStar from '../../Components/RatingReview/RatingStar';
import placeholder from '../../placeholder-image.png'
import { useLocation } from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux'
// import { useEffect } from 'react';
import './ViewTourCompany.scss';

// import {getCompanyInfo} from '../../redux/actions/CompanyAction'
// import { getDestination } from '../../redux/actions/BasicAction';

const Info = ({title, info, icon}) => {
  return (
    <div className = "smaller-info">
      <i class={icon}></i>
      <p className = "title">{title}</p>
      <p className = "info">{info}</p>
    </div>
  )
}

export default function ViewTourCompany() {
  // const dispatch = useDispatch()
  const location = useLocation()
  const {info} = location?.state || {}
  // const {destination, user_login} = useSelector(state => state.BasicReducer)
  // const {user_login} = useSelector(state => state.CompanyReducer)

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

  // console.log(user_login)

  return (  
      <div id="view-tour-page">
          <HeaderAbout/>
          <div className="tour-info">
            <div>
              <p className = "name">{info?.name}</p>
              <i class="fa-solid fa-location-dot"></i>
              <p className = "destination">{info?.destination}</p>
              <i class="fa-solid fa-building"></i>
              <p className = "company">{info?.company}</p>
              <RatingStar numberStar={Math.floor(info?.rating)}/>
              <p className = "review">({info?.num_review} reviews)</p>
              <div className = "container-smaller">
                <Info title = "Cost per person" info = {info?.price+"$"} icon = "fa-solid fa-credit-card"/>
                <Info title = "Duration" info ={info?.duration + (info?.duration > 1 ? " days" : " day")} icon = "fa-solid fa-clock"/>
                <Info title = "Max people" info = {info?.num_max} icon = "fa-solid fa-user-group"/>
              </div>
              <button>Book tour <i class="fa-solid fa-cart-plus"></i></button>
              <i className="fa-regular fa-heart"></i>
              <i className="fa-regular fa-flag"></i>
            </div>
            <img src = {importPhoto(info?.photo_path, "tour") || placeholder}></img>
          </div>
          <div className="tour-description">
            <div className = "description">
              <p className = "title">Description</p>
              <p>{info?.description}</p>
            </div>
            <div className = "included">
              <p className = "title">What's included</p>
              <p>{info?.included}</p>
            </div>
            <div className = "not-included">
              <p className = "title">What's not included</p>
              <p>{info?.not_included}</p>
            </div>
            <div className = "tour-plan">
              <p className = "title">Tour plan</p>
              <button disabled = {!info?.schedule} onClick = {() => window.open(info?.schedule, '_blank')}>See detail</button>
            </div>
            <div className = "location">
            <p className = "title">Location</p>
              <p></p>
            </div>
            <div className = "contact">
              <p className = "title">Contact</p>
              <p>
                <i class="fa-solid fa-phone"></i>
                {info?.phone}
              </p>
            </div>
          </div>
      </div>
  );
}

// export default Search;