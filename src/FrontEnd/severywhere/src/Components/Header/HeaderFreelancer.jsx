import "./HeaderFreelancer.scss";
import logo from "./logo_horizon.png"

export default function HeaderFreelancer(){
    return(
        <header className = "header-freelancer">
            <img  src={logo} className="SE-logoo" alt="logo" />
            <div>
                <a href = "https://www.google.com/" className = "view-profile">View profile as tourist</a>
                <a href = "/aboutus" className = "about-faq">About & FAQs</a>
            </div>
        </header>
    )
}
