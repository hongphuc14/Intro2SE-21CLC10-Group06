import "./HeaderAdmin.scss";
import logo from "./logo_horizon.png"

export default function HeaderAdmin(){
    const goBack = () => window.history.back()

    return(
        <header className = "header-admin">
            <img  src={logo} className="SE-logoo" alt="logo" />
            <div>
                <a href = "/profile-admin" className = "about-faq" onClick = {goBack}>Back to dashboard</a>
            </div>
        </header>
    )
}
