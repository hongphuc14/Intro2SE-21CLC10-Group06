import IntroCard from "../../Components/TourGuidePageComponents/IntroCard";
import AttractionCard from "../../Components/TourGuidePageComponents/AttractionCard";
import HeaderAbout from '../../Components/Header/HeaderAbout';
import RatingStar from '../../Components/RatingReview/RatingStar';
import placeholder from '../../placeholder-image.png'
import "./ViewFreelancer.scss"

import { useSelector, useDispatch } from 'react-redux';
import { getTourGuideByIdGuide } from '../../redux/actions/FreelancerAction';
import { useEffect,useState } from 'react';

const ViewFreelancer = () => {
    const dispatch = useDispatch()
    const {destination, user_login} = useSelector(state => state.BasicReducer)
    const { guide_info} = useSelector(state => state.FreelancerReducer)
    
    useEffect(() => {
        if (!guide_info.id_tourist)
            dispatch(getTourGuideByIdGuide(user_login.email))
        // dispatch(getDestination())
      },[guide_info?.id_guide] )

    const importPhoto = (filename, folder) => {
        if (typeof filename === 'undefined' || filename === "")
          return placeholder
        try{
          const path = require(`../../../../../BackEnd/public/${folder}/${filename}`)
          return path}
        catch (err) {
          return placeholder
        }
      }

    return (  
        <div id="view-freelancer">
            <HeaderAbout />
            <div id="guide-header">
                <div className="guide-background">
                    <img src="./ninhbinh2.jpg" alt="background-image" />
                </div>
                <div className="guide-under-background">
                    <div className="guide-avatar">
                        <img src= {importPhoto(guide_info.avatar, "freelancer_avatar")} alt="avatar-image" />
                    </div>
                    <div class="guide-info-container">
                        <div class="fullname-heart-flag-container">
                            <h1>{guide_info.fullname}</h1>
                            <RatingStar numberStar={parseInt(guide_info.rating)}/>
                            <p>({guide_info.num_review} reviews)</p>
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-regular fa-flag"></i>
                        </div>
                    </div>
                    <button >Book guide <i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
            <div id="guide-main-page">
                <div id="left-container">
                    {/* <IntroCard  info = {guide_info} /> */}
                    <div className = "guide-review">
                        <p>Reviews & Ratings</p>
                        <div class="horizontal-line"></div>
                        {
                            guide_info?.reviews?.map (review =>{
                                // const {id_tour_booking, avatar, fullname, rating, review, review_date} = info.tourist_reviews;
                                return (
                                <div key = {review.id_guidebooking} className = "review-card">
                                    <img src={importPhoto(review.avatar, "tourist_avatar")} alt = "tourist-avatar"></img>
                                    <div>
                                        <p className = "review-card-name">{review.fullname}</p>
                                        <p className = "review-card-date">{review.review_date ? new Date(review.review_date).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB")}</p>
                                        <RatingStar numberStar={review.rating}/>
                                    </div>
                                    <p className = "review-card-line">{review.review}</p>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div id="right-container">
                    {
                        guide_info.attractions.map(attr => {
                            return (
                                <AttractionCard key = {attr.id_attraction} {...attr}/>
                            )
                        })
                    }
                </div> */}
            </div>
        </div>
    );
}
 
export default ViewFreelancer;