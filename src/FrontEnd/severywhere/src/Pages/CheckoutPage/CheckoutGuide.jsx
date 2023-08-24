import './CheckoutGuide.scss'

const CheckoutGuide = () => {
    return (  
        <div id="checkout-guide-page">
            <div class="checkout-page-container">
                <div class="checkout-left-container">
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
                    <div class="fillin-form">
                        <div class="fillin-components">
                            <div class="info-part">
                                Fullname
                                <input type="text" placeholder="Phan My Linh" />
                            </div>
                            <div class="info-part">
                                Email
                                <input type="text" placeholder="phanmyxlinh@gmail.com" />
                            </div>
                        </div>
                        <div class="fillin-components">
                            <div class="info-part">
                                Phone
                                <input type="text" placeholder="+84901234567" />
                            </div>
                            <div class="info-part">
                                Phone
                                <input type="text" placeholder="+84901234567" />
                            </div>
                        </div>
                        <div class="show-total">
                            Total:
                            <a>$52.00</a>
                        </div>
                    </div>
                </div>
                <div class="checkout-right-container">
                    <h1>CHECK OUT</h1>
                    <p>SUMMARY</p>
                    <div class="price">
                        <p>Price:</p>
                        <p>$52.00</p>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="total">
                        <p>Total:</p>
                        <p>$52.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CheckoutGuide;