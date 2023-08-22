import './TourGuideCard.scss';
import placeholder from '../../placeholder-image.png'
import RatingStar from '../RatingReview/RatingStar';

const TourGuideCard = ({info}) => {
    const {fullname, destination, experience, price, avatar, rating, language} = info || {}
    const lang = language?.join(' - ')
    console.log(info)

    const importPhoto = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        try {
            const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
            return path
        }
        catch (e) {
            return null
        }
      }

    return (  
        <div class="guide-card">
            <img src = { importPhoto(avatar) || placeholder }></img>
            <div class="guide-subcard">
                <div class="guide-rating">
                <RatingStar numberStar = {Math.floor(rating)}/>
                </div>
                <div class="guide-title">{fullname || "Full name"}</div>
                <div class="guide-info">
                <i class="fa-solid fa-building"></i>
                <p>{experience || "Experience"}</p>
                </div>
                <div class="guide-info">
                <i class="fa-solid fa-language"></i>
                <p>{lang || ""}</p>
                </div>
                <div class="guide-info">
                <i class="fa-solid fa-location-dot"></i>
                <p>{destination || "Location"}</p>
                </div>
                <div class="guide-info">
                <i class="fa-solid fa-dollar-sign"></i>
                <p>{price || "Price per session"}$</p>
                </div>
            </div>
        </div>
    );
}
 
export default TourGuideCard;