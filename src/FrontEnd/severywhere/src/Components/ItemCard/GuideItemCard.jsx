import './GuideItemCard.scss'

const GuideItemCard = () => {
    return (  
        <div class="guide-cart-card">
            <div class="left-cart-container">
                <div class="guide-ava">
                    <img src="./portrait2.jpg" alt="avatar-image" />
                </div>
            </div>
            <div class="right-cart-container">
                <div class="guide-name">
                    Ngo Ngoc Lien
                </div>
                <div class="guide-rating">4.8</div>
                <div class="guide-info-cost-container">
                    <div class="guide-info-container">
                        <div class="guide-info">
                            <i class="fas fa-briefcase"></i>
                            <p>8 years of experience</p>
                        </div>
                        <div class="guide-info">
                            <i class="fas fa-globe"></i>
                            <p>Vietnamese</p>
                        </div>
                        <div class="guide-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>Binh Dinh, Vietnam</p>
                        </div>
                    </div>
                    <div class="guide-cost-container">
                        <div class="fas fa-dollar-sign cost-icon"></div>
                        <div>
                            <div class="cost-title">Cost per session</div>
                            <div class="cost">52.00</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default GuideItemCard;