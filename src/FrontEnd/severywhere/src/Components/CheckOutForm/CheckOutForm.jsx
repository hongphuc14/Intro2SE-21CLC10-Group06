import './CheckOutForm.scss';
const CheckOutForm = () => {
    return (
        <div id="checkout-box">
            <div id="checkout">
                <div id="checkout-infotour">
                    <div id="tour-image">
                        <img src="./" alt="" />
                    </div>
                    <div id="tour-info">
                        <div id="tour-name">
                            <h1>Ha Long Bay Deluxe Day Tour</h1>
                        </div>
                        <div>
                            <div id="tour-locate">
                                <i class="fa-solid fa-location-dot"></i>
                                <p> Quang Ninh, Vietnam</p>
                            </div>
                            <div id="tour-company">
                                <i class="fa-solid fa-building"></i>
                                <p> By the Tour Company</p>
                            </div>
                            <div id="rating-star">
                                <i class="fa-solid fa-star"></i>
                                <p> 3.9</p>
                            </div>
                            <div className='subcategory'>
                                <div id="tour_subinfo">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <div class="tourcontent_co">
                                        <p class="sub_title"> Cost</p>
                                        <p class="sub_val"> 100$</p>
                                    </div>
                                </div>
                                <div id="tour_subinfo">
                                    <i class="fa-solid fa-clock"></i>
                                    <div class="tourcontent_co">
                                        <p class="sub_title"> Duration</p>
                                        <p class="sub_val"> 100$</p>
                                    </div>
                                </div>
                                <div id="tour_subinfo">
                                    <i class="fa-solid fa-umbrella-beach"></i>
                                    <div class="tourcontent_co">
                                        <p class="sub_title"> Type</p>
                                        <p class="sub_val"> 100$</p>
                                    </div>
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="payment">
            </div>

        </div>
    );
}

export default CheckOutForm;