import placeholder from '../../placeholder-image.png'
import './ReviewCompany.scss';
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import { ButtonUploadFreelancer } from '../../Components/Button/ButtonFreelancer';
import {Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCompanyInfo, updateReply, updateReport } from '../../redux/actions/CompanyAction';
import RatingStar from '../../Components/RatingReview/RatingStar'
export default function ReviewCompany(){
    const dispatch = useDispatch()
    const { user_login } = useSelector(state => state.BasicReducer)
    const {company_info} = useSelector(state => state.CompanyReducer)

    const location = useLocation()
    window.history.replaceState(null, null, location.pathname);
    const {list} = location.state || {}
    console.log(list) 
  
    useEffect(() => {
        dispatch(getCompanyInfo(user_login.email))
    },[] )
  

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
        const path = require(`../../../../../BackEnd/public/tourist_avatar/${filename}`)
        return path}
      catch (err) {
        return null
      }
    }

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

      dispatch(updateReply(company_info.id_company, noReview, reply, formattedDate))
      setIsReply(false)
      setReply("")
    }
  }

  const [noReview, setNoReview] = useState(null)
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
      dispatch(updateReport(company_info.id_company, noReview, report, formattedDate))
      setIsReport(false)
      setReport("")
    }
  }

    return (
    <div className="review-company">
      <HeaderCompany/>
      <NavbarCompany src = {importAvatar(company_info?.avatar) || placeholder} name = {company_info?.name?.toUpperCase()} flag3 = "focus"/>
      
      <div className = "main-review">
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
        <Link to= "/statistics-company">
            <ButtonUploadFreelancer className="button-upload" title = "BACK" />
        </Link>
        <div className = "review-list">
        {
          list?.map((item) =>{
              const {review_date, review, id_tour_booking, rating, fullname, avatar} = item

              return (
                <div key = {id_tour_booking} className = "review">
                  <img src={importPhoto(avatar)} alt = "tourist-avatar"></img>
                  <div>
                    <p className = "review-name">{fullname}</p>
                    <RatingStar numberStar={rating}/>
                    <i className="fas fa-flag" onClick = {() => {setIsReport(true); setNoReview(id_tour_booking)}}></i>
                    <i className="fas fa-comment-dots" onClick = {() => {setIsReply(true); setNoReview(id_tour_booking)}}></i>
                  </div>
                  <p className = "review-date">{review_date ? new Date(review_date).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB")}</p>
                  <p className = "review-line">{review}</p>
                </div>
              )
          })
        }
        </div>
      </div>
    </div>
    )
  }