import './AboutUs_FAQ.scss';
import HeadBanner from './headbanner.png';
import IconHiking from './AU1.png';
import Sailing from './AU2.png';
import FAQs from './FAQs.png';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import HeaderAbout from '../../Components/Header/HeaderAbout';
import {useSelector} from 'react-redux'

export default function AboutUs_FAQ() {
    const role = useSelector(state => state.BasicReducer.user_login.id_role) || null

    return (
        <div className="aboutus-faq-page">
            {
                (role === 2 || role === 3) ? <HeaderAbout/> : <HeaderGuest/>
            }
            <div className='content-ab-faq'>
                <section class="head-banner">
                    <img src={HeadBanner} alt="Head Banner Image" width="100%"/>
                </section>

                {/* <!-- ICON HIKING --> */}
                <section class="icon-hiking">
                    <img src={IconHiking} alt="ICON HIKING Image" />
                </section>

                {/* <!-- SEverywhere --> */}
                <section class="severywhere">
                    <h2>SEverywhere</h2>
                </section>

                {/* <!-- SEverywhere text1 --> */}
                <section class="severywhere-text1">
                    <p>SEverywhere is Vietnam’s travel website, we provide you with access to discover and purchase different types of travel needs, or local tours offered by freelancers. SEverywhere's comprehensive product portfolio includes tour booking services as well as access to the most fascinating destinations in Vietnam. Not only that, to help you broadcast your business and satisfy your pleasure of exploration, we also offer a wide range of local attractions, activities, and policies to start your business. Whatever you want to go, you are just one click away!</p>
                </section>

                {/* <!-- SEverywhere text2 --> */}
                <section class="severywhere-text2">
                    <p>SEverywhere believes that happiness may come in many forms for different people on different occasions. Therefore, with our credibility, we promise you an extensive choice to ignite your very own state of happiness. Whether you are looking for a glamping experience or a staycation in a 5-star resort, a relaxing spa day or a thrilling holiday adventure, a convenient first-class flight or an exciting road trip, you can find it all on the SEverywhere website. With 24/7 customer service, SEverywhere is making a name for itself in our beautiful Vietnam.</p>
                </section>

                {/* <!-- Sailing pic --/> */}
                <section class="sailing-pic">
                    <img src={Sailing} alt="Sailing Pic Image" />
                </section>

                <section class="faq-section">
                    <div class="head-banner">
                        <img src={FAQs} alt="Head Banner Image" width="100%" height="auto" />
                    </div>

                    <div class="faq-content">
                        <h3>1. How do I book a flight/hotel/car rental on your website?</h3>
                        <p>To book a tour on our website, simply go to the respective section and enter your travel details, including dates, destinations, and any other specific requirements. The website will display available options, and you can choose the one that suits your preferences and budget. Follow the prompts to complete the booking process.</p>

                        <h3>2. What payment methods do you accept?</h3>
                        <p>We accept various payment methods, including credit cards (Visa, Mastercard, American Express), debit cards, and online payment platforms such as PayPal. The available payment methods will be displayed during the checkout process.</p>

                        <h3>3. Can I cancel or modify my reservation? What is the cancellation policy?</h3>
                        <p>Yes, you can typically cancel or modify your reservation, although specific terms and conditions may vary depending on the provider or service you booked. The cancellation policy will be clearly stated during the booking process, and it is advisable to review the terms before confirming your reservation.</p>

                        <h3>4. What travel documents do I need for my trip?</h3>
                        <p>The required travel documents can vary depending on your destination and nationality. Common documents include a valid passport, visa (if applicable), and any necessary health certificates or vaccination records. It is essential to check the entry requirements for your specific destination and ensure you have the required documents well in advance of your trip.</p>

                        <h3>5. What is your policy for traveling with children?</h3>
                        <p>Our policy for traveling with children may vary depending on the service or provider. Some airlines or hotels may have specific guidelines or age restrictions for infants, children, or unaccompanied minors. It's advisable to check the individual policies or contact our customer support for more information regarding traveling with children.</p>

                        <h3>6. Can I request special accommodations (e.g., wheelchair access, dietary restrictions)?</h3>
                        <p>Yes, you can typically request special accommodations during the booking process or by contacting our customer support. Common special accommodations include wheelchair access, dietary restrictions, medical assistance, or specific room preferences. We strive to accommodate your needs and make your travel experience as comfortable as possible.</p>
                    </div>
                    
                </section>
                
            </div>
            <Footer/>
        </div>
    );
}