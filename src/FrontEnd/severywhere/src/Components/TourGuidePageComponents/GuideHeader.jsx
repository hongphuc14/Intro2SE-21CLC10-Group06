import './GuideHeader.scss'

const GuideHeader = () => {
    return (  
        <div id="guide-header">
            <div className="guide-background">
                <img src="./ninhbinh2.jpg" alt="background-image" />
            </div>
            <div className="guide-under-background">
                <div className="guide-avatar">
                    <img src="./portrait2.jpg" alt="avatar-image" />
                </div>
                <div class="guide-info-container">
                    <div class="fullname-heart-flag-container">
                        <h1>Ngo Ngoc Lien</h1>
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-regular fa-flag"></i>
                    </div>
                </div>
                <button>Add to cart <i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    );
}
 
export default GuideHeader;