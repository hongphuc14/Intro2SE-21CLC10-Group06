import IntroCard from "../../Components/TourGuidePageComponents/IntroCard";
import AttractionCard from "../../Components/TourGuidePageComponents/AttractionCard";
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import RatingStar from '../../Components/RatingReview/RatingStar';
import {ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import "./TourGuidePage.scss"

import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {getTouristInfo, reportGuide} from '../../redux/actions/TouristAction'
import { useEffect,useState } from 'react';

const TourGuidePage = () => {
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
          dispatch(reportGuide(tourist_info.id_tourist, info.id_guide, report, formattedDate))
          setIsReport(false)
          setReport("")
        }
      }

    return (  
        <div id="tourguide-page">
            <HeaderGuest />
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
            <div id="guide-header">
                <div className="guide-background">
                    <img src="./ninhbinh2.jpg" alt="background-image" />
                </div>
                <div className="guide-under-background">
                    <div className="guide-avatar">
                        <img src= {importPhoto(info.avatar, "freelancer_avatar")} alt="avatar-image" />
                    </div>
                    <div class="guide-info-container">
                        <div class="fullname-heart-flag-container">
                            <h1>{info.fullname}</h1>
                            <RatingStar numberStar={parseInt(info.rating)}/>
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-regular fa-flag" onClick = {() => {
                                if (!tourist_info.id_tourist)
                                    window.location.href = "/login"
                                else 
                                    setIsReport(true)
                                }}>
                            </i>
                        </div>
                    </div>
                    { tourist_info.id_tourist ? (
                        <Link to = {{pathname: "/checkoutGuide", state: {info: info}}} style = {{textDecoration: "none"}} >
                        <button >Book guide <i class="fa-solid fa-cart-plus"></i></button>
                        </Link>
                    ) :
                    (
                        <a href = "/login">
                        <button >Book guide <i class="fa-solid fa-cart-plus"></i></button>
                        </a>
                    )
                    }
                </div>
            </div>
            <div id="guide-main-page">
                <div id="left-container">
                    <IntroCard  info = {info} />
                </div>
                <div id="right-container">
                    <AttractionCard />
                    <AttractionCard />
                    {/* <AttractionCard />
                    <AttractionCard />
                    <AttractionCard />
                    <ReviewCard /> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default TourGuidePage;