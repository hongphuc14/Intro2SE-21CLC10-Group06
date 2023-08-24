import './IntroCard.scss'

const IntroCard = () => {
    return ( 
        <div class="intro-card">
            <p class="intro-title">Intro</p>
            <p class="intro-content">Your guide to extraordinary adventures and remarkable destinations.</p>
            <div class="horizontal-line"></div>
            <div class="info-container">
                <div class="fas fa-briefcase type-icon"></div>
                <div>
                    <div class="type-title">Experience</div>
                    <div class="type-content">8 years</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-globe type-icon"></div>
                <div>
                    <div class="type-title">Language</div>
                    <div class="type-content">Vietnamese</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-map-marker-alt type-icon"></div>
                <div>
                    <div class="type-title">Location</div>
                    <div class="type-content">Binh Dinh, Vietnam</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-phone type-icon"></div>
                <div>
                    <div class="type-title">Contact</div>
                    <div class="type-content">+8490 123 4567</div>
                </div>
            </div>
        </div>
    );
}
 
export default IntroCard;