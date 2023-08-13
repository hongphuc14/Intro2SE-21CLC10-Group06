import "./NavbarFreelancer.scss";
import {Link} from "react-router-dom"

export default function NavbarFreelancer({src, fullname, flag1, flag2, flag3}){
    // const history = useHistory();
    // const handleClick = () => {
    //     history.push("/profile-freelancer");
    //   };

    //   onClick={handleClick}

    return(
        <nav className = "navbar-freelancer">
            <div className = "avatar">
                <img src={src} alt = "avatar"></img>
                <p>{fullname}</p>
            </div>
            <Link to =  "/profile-freelancer"  style={{ textDecoration: 'none' }}>
                <button className = {flag1} >
                    <i className="fas fa-user-circle"></i>
                    <p className = "textNavbar">PROFILE</p>
                </button>
            </Link>
            <Link to = "/calendar-freelancer" style={{ textDecoration: 'none' }}>
                <button className = {flag2}>
                    <i className="fas fa-list-ul"></i>
                    <p className = "textNavbar">SET CALENDAR</p>
                </button>
            </Link>
            <Link to = "/statistics-freelancer" style={{ textDecoration: 'none' }}>
                <button className = {flag3}>
                    <i className="fas fa-chart-bar"></i>
                    <p className = "textNavbar">STATISTICS</p>
                </button>
            </Link>
  
        </nav>
    )
}

