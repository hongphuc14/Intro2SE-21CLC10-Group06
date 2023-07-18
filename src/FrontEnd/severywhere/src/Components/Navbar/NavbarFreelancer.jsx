import "./NavbarFreelancer.scss";

function NavbarButtonFreelancer({icon, title, className}){
    return(
        <button className = {className}>
            <i class={icon}></i>
            <p className = "textNavbar">{title}</p>
        </button>
    )
}

function Avatar({img,fullname}){
    return(
        <div className = "avatar">
            <img src={img} alt = "avatar"></img>
            <p>{fullname}</p>
        </div>
    )
}

export default function Navbar({img, fullname}){
    return(
        <div className = "navbar-freelancer">
            <Avatar img = {img} fullname = {fullname}/>
            <NavbarButtonFreelancer icon = "fas fa-user-circle" title = "PROFILE" className = "focus"/>
            <NavbarButtonFreelancer icon = "fas fa-list-ul" title = "SET CALENDAR" />
            <NavbarButtonFreelancer icon = "fas fa-chart-bar" title = "STATISTICS"/>
        </div>
    )
}

