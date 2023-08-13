import './Footer.scss';

const Footer = () => {
    return (  
    <footer>
        <div id="footer-container">
            <div className="footer-col">
                <img className="footer-logo col-title" src=".\logo.png" alt=''/>
                <p>SEverywhere will guide you to every corner of Vietnam. Join us and have more fun!</p>
                <div id="social-media">
                    <i className="fab fa-facebook-f social-icon"></i>
                    <i className="fab fa-twitter social-icon"></i>
                    <i className="fab fa-instagram social-icon"></i>
                </div>
            </div>
            <div className="footer-col pages">
                <div className="col-title">
                    PAGES
                </div>
                <div className="pages-link">
                    <ul>
                        <li>&gt; About us</li>
                        <li>&gt; FAQs</li>
                        <li>&gt; Privacy Policy</li>
                        <li>&gt; Terms and Condition</li>
                    </ul>
                </div>
            </div>
            <div className="footer-col newsletter">
                <div className="col-title">
                    NEWSLETTER
                </div>
                <p>Subcribe our newsletter to get latest update & news.</p>
                <div className="newsletter-input">
                    <i className="fa-solid fa-paper-plane"></i>
                    <input type="text" placeholder="Email address" />
                </div>
            </div>
            <div className="footer-col">
                <div className="col-title">
                    CONTACT
                </div>
                <ul className="contact-list">
                    <li><i className="fa-solid fa-phone fa-lg contact-icon"></i>0901234567</li>
                    <li><i className="fa-solid fa-envelope fa-lg contact-icon"></i>severywhere@gmail.com</li>
                    <li><i className="fa-solid fa-location-dot fa-lg contact-icon"></i>227 Nguyen Van Cu, District 5, Ho Chi Minh City, Vietnam</li>
                </ul>
            </div>
            
        </div>
        <div id="copyright">
            &copy; Copyrights by NoMeo. All rights reserved.
        </div>
    </footer>
    
    );
}
 
export default Footer;