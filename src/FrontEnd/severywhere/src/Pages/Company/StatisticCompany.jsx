import placeholder from '../../placeholder-image.png'
import './StatisticCompany.scss';
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import RatingStar from '../../Components/RatingReview/RatingStar';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCompanyInfo,getCompanyBooking, getCompanyReview } from '../../redux/actions/CompanyAction';
import {getDestination} from '../../redux/actions/BasicAction'

export default function StatisticsCompany(){
  const dispatch = useDispatch() 

  const { user_login, destination } = useSelector(state => state.BasicReducer)
  const { company_info, company_booking, company_review, company_tour} = useSelector(state => state.CompanyReducer)
 
  const [tourByDate, setTourByDate] = useState([])
  const [reviewByTour, setReviewByTour] = useState([])

  useEffect(() => {
      dispatch(getCompanyInfo(user_login.email))
      if (destination?.length === 0)
        dispatch(getDestination())
  },[] )

  useEffect(() => {
    if (company_info?.id_company) {
        dispatch(getCompanyBooking(company_info.id_company))
        dispatch(getCompanyReview(company_info.id_company))
    }
  }, [company_info.id_company])

  useEffect(() => {
    setTourByDate([...company_booking]);
  },[company_booking])

  useEffect(() => {
    setReviewByTour([...company_review]);
  },[company_review])

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

  const importPhoto = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
      try{
        const path = require(`../../../../../BackEnd/public/tour/${filename}`)
        return path}
      catch (err) {
        return null
      }
  }

  const getDes = (id) =>{
    let name = ""
    destination.forEach(des => {
        if (id === des.id_des)
            name = des.name
    })
    return name
  }

  console.log(tourByDate, reviewByTour)
  
  let totalSales = 0
  let totalBookings = 0
  for (const item of tourByDate){
    for (const tmp of item.booking)
      if (tmp.status === 6 || tmp.status === 2 || tmp.status === 5)
        totalSales += tmp.total_price
    totalBookings += item.booking?.length
  }

  let totalRating = 0
  let lengthRating = 0
  for (const tour of reviewByTour){
    for (const review of tour.review)
      if (review.rating){
        totalRating += review.rating
        lengthRating += 1
      }    
  }
  let averageRating = lengthRating ? totalRating / lengthRating : 0


  return(
    <div className = "statistics-company">
        <HeaderCompany/>
        <NavbarCompany src = {importAvatar(company_info.avatar) || placeholder} name = {company_info?.name?.toUpperCase()} flag3 = "focus"/>  
        <div className = "main-statistic">
          <div className = "statistic">
            <div className = "sale">
              <i className="fas fa-dollar-sign"></i>
              <p className = "title">TOTAL SALES</p>
              <p className = "data">{totalSales}</p>
              <p className = "des">$</p>
            </div>
            <div className = "booking">
              <i className="fas fa-cart-plus"></i>
              <p className = "title">TOTAL BOOKINGS</p>
              <p className = "data">{totalBookings}</p>
              <p className = "des">BOOKINGS</p>
            </div>
            <div className = "rating">
              <i className="fas fa-star"></i>
              <p className = "title">AVERAGE RATINGS</p>
              <p className = "data">{averageRating.toFixed(1)}</p>
              <p className = "des">({lengthRating} RATINGS)</p>
            </div>
          </div>

          <div className = "hr"></div>

          <div className = "tourbydate-section">
            <p>BOOKINGS</p>
            <div className = "tourbydate-list">
              {
                tourByDate.map(item =>{
                  return (
                    <Link key={`${item.id_tour}${item.start_date}`} style={{ textDecoration: 'none' }}
                     to = {{pathname: "/booking-company", state: {list: item.booking}}}>
                      <div className = "tourbydate">
                        <img src = {importPhoto(item.photo_path) || placeholder}></img>
                        <div className = "info">
                          <p>{item.name}</p>
                          <p>{getDes(item.id_des)}</p>
                          <p>{item?.start_date?.toString().slice(0,10)} - {item?.end_date?.toString().slice(0,10)}</p>
                          <p>{item.booking.length}/{item.num_max} tourists</p>
                          <p>{item.price}$</p>
                        </div>
                      </div>
                    </Link>
                    )
                })
              }
            </div>
          </div>

          <div className = "hr"></div>

          <div className = "review-section">
            <p>RATINGS & REVIEWS</p>

            <div className = "review-list">
              {
                reviewByTour.map(item =>{
                  return (
                    <Link key={item.id_tour} style={{ textDecoration: 'none' }}
                     to = {{pathname: "/review-company", state: {list: item.review}}}>
                      <div className = "reviewbytour">
                        <img src = {importPhoto(item.photo_path) || placeholder}></img>
                        <div className = "info">
                          <p>{item.name}</p>
                          <RatingStar numberStar = {item.rating}/>
                          <p>{getDes(item.id_des)}</p>
                          <p>{item.totalReview} reviews</p>
                        </div>
                      </div>
                    </Link>
                    )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}