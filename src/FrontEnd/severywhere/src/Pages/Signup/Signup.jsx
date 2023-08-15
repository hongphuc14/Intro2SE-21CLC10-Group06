import './Signup.scss'
import SignupBox from '../../Components/SignupBox/SignupBox';
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer';

export default function Signup() {
    return (  
        <div id="signup-background">
            <HeaderGuest/>
            <SignupBox/>
            <Footer/>
        </div>
    );
}