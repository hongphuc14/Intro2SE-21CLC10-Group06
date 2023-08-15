import './Login.scss'
import LoginBox from '../../Components/LoginBox/LoginBox';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';


export default function Login (){
    return(
        <div className = "login-page">
            <HeaderGuest/>
            <LoginBox/>
            <Footer/>
        </div>
        
    )
}