import "./MyTours.scss"
import Sidebar from "../../Components/SideNavBar/NavBar"
import HeaderGuest from "../../Components/Header/HeaderGuest"
import Footer from "../../Components/Footer/Footer"
import image from './NinhBinh.jpg'
const MyTours = () => {
    return (
        <div id="MyTours">
            <HeaderGuest />
            <div className="container">
                <Sidebar />
                <div className="mytour-content">
                    <div className="mytour-header">
                        <h1>My Tours</h1>
                    </div>
                    <div className="tour_one">
                        {/* <div id="t?our-ima?ge"> */}
                            <img src={image} alt="" />
                        {/* </div> */}
                        <div id="tour-info">
                            <div id="tour-name">
                                <h2>Ninh Binh</h2> 
                                <button>Cancel</button>
                            </div>
                            <div>
                                <div id="tour-locate">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>Ninh Binh, Vietnam</p>
                                </div>
                                <div id="tour-company">
                                    <i class="fa-solid fa-building"></i>
                                    <p>Traveloka</p>
                                </div>
                                <div id="rating-star">
                                    <i class="fa-solid fa-star"></i>
                                    <p>5 stars</p>
                                </div>
                                <div className='subcategory'>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-dollar-sign"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Cost</p>
                                            <p class="sub_val">100$</p>
                                        </div>
                                    </div>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-clock"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Duration</p>
                                            <p class="sub_val"> 1 days</p>
                                        </div>
                                    </div>
                                    <div id="tour_subinfo">
                                        <i class="fa-solid fa-umbrella-beach"></i>
                                        <div class="tourcontent_co">
                                            <p class="sub_title"> Type</p>
                                            <p class="sub_val"> Culture</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tour_two">
                        <div id="info_one">
                            <div id="info_name">
                                <p>Fullname</p>
                                <input type="text" readOnly value="Nguyen Thi Minh Minh" />
                            </div>
                        </div>
                        
                        <div id="info_two">
                            <div id="info_startdate">
                                <p>Start date</p>
                                <input type="date" value= "07/02/2023" readOnly />
                            </div>
                            <div id="info_enddate">
                                <p>End date</p>
                                <input type="date" value= "08/03/2023" readOnly/>
                            </div>
                        </div>
                        <div id="info_three">
                            <div id="infoticket">
                                <p>Number of tickets:</p>
                                <input type="number" value="2" readOnly/>
                            </div>
                            <div id="info_total">
                                <p>Total:</p>
                                <p id="totalpay">$ 78.00</p>
                            </div>
                        </div>
                        <div id="info_four">
                            <p>Booking day: 13/06/2003</p>
                            <p id ="tour_status">Booked</p>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    );
}

export default MyTours;