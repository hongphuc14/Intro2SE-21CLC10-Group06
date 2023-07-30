import './HeaderGuest.css'
import logo from './logo.png'

const HeaderGuest = () => {
    return ( 
        <header className="header-guest">
            <img src={logo} className="SE-logo" alt="logo" />
            <div>
                <a className='option' href = "https://www.google.com/">About</a>
                <a className='option' href = "https://www.google.com/">FAQs</a>
                <a className='option' href = "https://www.google.com/">Tour Guides</a>
                <a className='option' href = "https://www.google.com/">Tours</a>
            </div>
            <a id='header-line'></a>
            <div>
                <a className="fas fa-cart-plus header-icon" href = "https://www.google.com/"></a>
                <a className="fas fa-heart header-icon" href = "https://www.google.com/"></a>

            </div>
            
            
            
        </header>
     );
}
 
export default HeaderGuest;