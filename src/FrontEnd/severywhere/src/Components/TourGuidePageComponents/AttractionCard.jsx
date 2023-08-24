import './AttractionCard.scss'

const AttractionCard = () => {
    return (  
        <div class="attraction-card">
            <p class="attraction-title">Quy Nhon Champa Culture Excursion Half-day Tour</p>
            <div class="attraction-info-container">
                <div class="attraction-image-container">
                    <img src=".\champa1.jpg" alt="attraction-image" />
                </div>
                <div class="attraction-description-container">
                    <p>Discover Quy Nhon Champa Culture in one day to experience many visiting site at this beach city in south Central Vietnam. Even though Quy Nhon is not considered a tourist destination, this medium-sized city is bordered by beautiful beaches and the surrounding landscape is also breathtaking.</p>
                </div>
            </div>
        </div>
    );
}
 
export default AttractionCard;