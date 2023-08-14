import "./NavbarCompany.scss";
import {Link} from "react-router-dom"

export default function NavbarCompany({src, name, flag1, flag2, flag3}){
    return(
        <nav className = "navbar-company">
            <div className = "avatar">
                <img src={src} alt = "avatar"></img>
                <p>{name}</p>
            </div>
            <Link to = "/profile-company" style={{ textDecoration: 'none' }}>
            
                <button className = {flag1}>
                    <i className="fas fa-user-circle"></i>
                    <p className = "textNavbar">PROFILE</p>
                </button>
            </Link>
            <Link to = "/tour-company" style={{ textDecoration: 'none' }}>
            {/* <a href = "/tour-company"> */}
                <button className = {flag2}>
                    <i className="fas fa-list-ul"></i>
                    <p className = "textNavbar">MANAGE TOUR</p>
                </button>
            {/* </a> */}
            </Link>
            <Link to = "/statistics-company" style={{ textDecoration: 'none' }}>
                <button className = {flag3}>
                    <i className="fas fa-chart-bar"></i>
                    <p className = "textNavbar">STATISTICS</p>
                </button>
            </Link>
  
        </nav>
    )
}

