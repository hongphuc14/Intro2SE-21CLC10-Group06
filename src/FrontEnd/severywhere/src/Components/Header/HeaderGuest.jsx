import "./HeaderGuest.scss";
// import logo from "../../../public/manifest.json"

const Navbar = () => {
    return (
        <nav className="Header-Guest">
                <div className = "container">
                    {/* <div className="Logo-container">
                        <img src="/horizontal_white.png" className = "SE-logo" alt = "logo"/>
                    </div> */}
                    <a href = "https://www.google.com/" id="lg">
                    <img src="/horizontal_white.png" className = "SE-logo" alt = "logo"/>
                    </a>
                    
                    <div className = "subcontainer">
                        <div className = "Menu">
                            <a href = "https://www.google.com/">About</a>
                            <a href = "https://www.google.com/">FAQs</a>
                            <a href = "https://www.google.com/">Tour Guides</a>
                            <a href = "https://www.google.com/">Tours</a>
                        </div>

                        <line className="vertical-line"></line>
                        <icons className="icons">
                            <a href = "https://www.google.com/">
                                <i className="fa-solid fa-cart-shopping cartheart" href="https://www.google.com/"></i>
                            </a>
                            <a href = "https://www.google.com/">
                                <i className="fa-solid fa-heart cartheart"></i>
                            </a>
                            
                            <div className="user">
                                <i className="fa-solid fa-circle-user iconuser"></i>
                                <i className="fa fa-chevron-down dropdown" ></i>
                            </div>
                            
                        </icons>
                    </div>
                </div>   
        </nav>
    )
};


export default Navbar;



            
