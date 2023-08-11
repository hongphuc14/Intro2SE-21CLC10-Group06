import "./HeaderCompany.scss";
import logo from "./logo_horizon.png"

export default function HeaderCompany(){
    return(
        <header className = "header-company">
            <img  src={logo} className="SE-logo" alt="logo" />
        </header>
    )
}

