import './Login.scss'
import LoginBox from '../../Components/LoginBox/LoginBox';
import HeaderGuest from '../../Components/Header/HeaderGuest';


function Login (){
    return(
        <div className = "login-page">
            <HeaderGuest/>
            <LoginBox/>
        </div>
        
    )
}

export default Login;