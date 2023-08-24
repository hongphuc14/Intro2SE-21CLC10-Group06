import "./HeaderAbout.scss";
import logo from "./logo_horizon.png"

export default function HeaderAbout({link = ""}){
    const goBack = () => window.history.back()
    // const role = useSelector(state => state.BasicReducer.user_login.id_role)
    
    return(
        <header className = "header-about">
            <img  src={logo} className="SE-logoo" alt="logo" />
            <div>
                <a className = "about-faq" onClick = {goBack}>Back to dashboard</a>
            </div>
        </header>
    )
}

