import './TourCard.scss';
import placeholder from '../../placeholder-image.png'
import RatingStar from '../RatingReview/RatingStar';

const TourCard = ({info}) => {
    const {name, company, destination, duration, price, num_max, photo_path, rating} = info || {}
    console.log(info)

    const importPhoto = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        try {
            const path = require(`../../../../../BackEnd/public/tour/${filename}`)
            return path
        }
        catch (e) {
            return null
        }
      }

    return (  
        <div class="tour-card">
            <img src = { importPhoto(photo_path) || placeholder }></img>
            <div class="tour-subcard">
                <div class="tour-rating">
                <RatingStar numberStar = {Math.floor(rating)}/>
                </div>
                <div class="tour-title">{name || "Tour title"}</div>
                <div class="tour-info">
                <i class="fa-solid fa-building"></i>
                <p>{company || "Company Name"}</p>
                </div>
                <div class="tour-info">
                <i class="fa-solid fa-location-dot"></i>
                <p>{destination || "Location"}</p>
                </div>
                <div class="tour-info">
                <i class="fa-solid fa-dollar-sign"></i>
                <p>{price || "Cost"}$</p>
                </div>
                <div class="tour-info">
                <div class="tour-info-bottom">
                    <i class="fa-regular fa-clock"></i>
                    <p>{duration || "duration"} days</p>
                </div>
                <div class="tour-info-bottom">
                    <i class="fa-solid fa-user-group"></i>
                    <p>{num_max || "quantity"}</p>
                </div>
                </div>
            </div>
        </div>
    );
}
 
export default TourCard;