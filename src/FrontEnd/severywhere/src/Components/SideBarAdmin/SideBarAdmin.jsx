import "./SideBarAdmin.scss";
import {Link} from "react-router-dom"

export default function SideBarAdmin({src, fullname, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8}){
    return(
        <nav className = "sidebar-admin">
            <div className = "avatar">
                <img src={src} alt = "avatar"></img>
                <p>{fullname}</p>
            </div>
            <Link to = "/admin/dashboard" style={{ textDecoration: 'none' }}>
                <button className = {flag1}>
                    <i className="fa-solid fa-house"></i>
                    <p className = "textNavbar">DASHBOARD</p>
                </button>
            </Link>
            <Link to = "/admin/users" style={{ textDecoration: 'none' }}>
                <button className = {flag2}>
                    <i className="fa-solid fa-user"></i>
                    <p className = "textNavbar">USERS</p>
                </button>
            </Link>
            <Link to = "/admin/tours" style={{ textDecoration: 'none' }}>
                <button className = {flag3}>
                    <i class="fa-solid fa-list-ul"></i>
                    <p className = "textNavbar">TOURS</p>
                </button>
            </Link>
            <Link to = "/admin/booking" style={{ textDecoration: 'none' }}>
                <button className = {flag4}>
                    <i className="fas fa-list-ul"></i>
                    <p className = "textNavbar">BOOKING</p>
                </button>
            </Link>
            <Link to = "/admin/reviews" style={{ textDecoration: 'none' }}>
                <button className = {flag5}>
                    <i class="fa-solid fa-star"></i>
                    <p className = "textNavbar">REVIEWS</p>
                </button>
            </Link>
            <Link to = "/admin/reports" style={{ textDecoration: 'none' }}>
                <button className = {flag6}>
                    <i class="fa-solid fa-flag"></i>
                    <p className = "textNavbar">REPORTS</p>
                </button>
            </Link>
            <Link to = "/admin/profile" style={{ textDecoration: 'none' }}>
                <button className = {flag7}>
                    <i class="fa-solid fa-circle-user"></i>
                    <p className = "textNavbar">PROFILE</p>
                </button>
            </Link>
            <button className = {flag8}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p className = "textNavbar">LOGOUT</p>
            </button>
        </nav>
    )
}
