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

export default function NavbarNavbarFreelancer({img, fullname, flag1, flag2, flag3}){
    return(
        <div className = "navbar-freelancer">
            <Avatar img = {img} fullname = {fullname}/>
            <NavbarButtonFreelancer icon = "fas fa-user-circle" title = "PROFILE" className = {flag1}/>
            <NavbarButtonFreelancer icon = "fas fa-list-ul" title = "SET CALENDAR" className = {flag2}/>
            <NavbarButtonFreelancer icon = "fas fa-chart-bar" title = "STATISTICS" className = {flag3}/>
        </div>
    )
}

