import "./HeaderForHomepage.scss";
import logo from "./logo_horizon.png"

export default function Header(){
    return(
        <div className = "headerForHomepage">
            {/* <a href= "https://www.google.com/" target = "_self" className = "SE-logo"> */}
                <img  src={logo} className="SE-logo" alt="logo" />
            {/* </a> */}
            <div>
                <a href = "https://www.google.com/" className = "view-profile">View profile as tourist</a>
                <a href = "https://www.google.com/" className = "about-faq">About & FAQs</a>
            </div>
        </div>
    )
}

