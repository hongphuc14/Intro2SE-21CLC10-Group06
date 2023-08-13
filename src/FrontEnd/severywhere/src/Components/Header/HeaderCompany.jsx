import "./HeaderCompany.scss";
import logo from "./logo_horizon.png"

export default function HeaderCompany(){
    return(
        <header className = "header-company">
            <img  src={logo} className="SE-logoo" alt="logo" />
            <div>
                <a href = "/aboutus" className = "about-faq">About & FAQs</a>
            </div>
        </header>
    )
}

