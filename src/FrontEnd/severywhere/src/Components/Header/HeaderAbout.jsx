import "./HeaderAbout.scss";
import logo from "./logo_horizon.png"

export default function HeaderAbout(){
    const goBack = () => window.history.back()

    return(
        <header className = "header-about">
            <img  src={logo} className="SE-logoo" alt="logo" />
            <div>
                <a href = "/profile-freelancer" className = "about-faq" onClick = {goBack}>Back to dashboard</a>
            </div>
        </header>
    )
}
