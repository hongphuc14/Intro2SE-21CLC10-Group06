import './TourCard.scss';

const TourCard = () => {
    return (  
        <div class="tour-card">
            <div class="tour-subcard">
                <div class="tour-rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
                <div class="tour-title">Tour title</div>
                <div class="tour-info">
                <i class="fa-solid fa-building"></i>
                <a>Company Name</a>
                </div>
                <div class="tour-info">
                <i class="fa-solid fa-location-dot"></i>
                <a>Location</a>
                </div>
                <div class="tour-info">
                <i class="fa-solid fa-dollar-sign"></i>
                <a>Cost</a>
                </div>
                <div class="tour-info">
                <div class="tour-info-bottom">
                    <i class="fa-regular fa-clock"></i>
                    <a>duration</a>
                </div>
                <div class="tour-info-bottom">
                    <i class="fa-solid fa-user-group"></i>
                    <a>quantity</a>
                </div>
                </div>
            </div>
        </div>
    );
}
 
export default TourCard;