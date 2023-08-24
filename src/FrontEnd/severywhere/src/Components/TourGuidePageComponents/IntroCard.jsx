import './IntroCard.scss'

const IntroCard = ({info}) => {
    return ( 
        <div class="intro-card">
            <p class="intro-title">Intro</p>
            <p class="intro-content">{info.description}</p>
            <div class="horizontal-line"></div>
            <div class="info-container">
                <div class="fas fa-briefcase type-icon"></div>
                <div>
                    <div class="type-title">Experience</div>
                    <div class="type-content">{info.experience}</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-globe type-icon"></div>
                <div>
                    <div class="type-title">Language</div>
                    <div class="type-content">{info.language.join(', ')}</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-map-marker-alt type-icon"></div>
                <div>
                    <div class="type-title">Location</div>
                    <div class="type-content">{info.destination}</div>
                </div>
            </div>
            <div class="info-container">
                <div class="fas fa-phone type-icon"></div>
                <div>
                    <div class="type-title">Contact</div>
                    <div class="type-content">{info.phone}</div>
                </div>
            </div>
        </div>
    );
}
 
export default IntroCard;