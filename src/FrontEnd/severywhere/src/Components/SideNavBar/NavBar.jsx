import "./NavBar.scss"

const NavBar = () => {
    return (
        <nav className="sidebar">
            <div className="user-profile">
                <div className="profile-image">
                    <img src="avatar.png" alt="User Profile"/>
                </div>
            </div>
            <div className="profile-name">
                Minh Minh
                <div className="mail">
                    ntmminh21@clc.fitus.edu.vn
                </div>
            </div>
            <ul>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Edit Profile</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-lock"></i>
                        <span>Password</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-heart heartedit"></i>
                        <span>Wishlist</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>Recent</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-comment-dots"></i>
                        <span>My Reviews</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa-solid fa-cart-shopping cartedit"></i>
                        <span>My Orders</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
