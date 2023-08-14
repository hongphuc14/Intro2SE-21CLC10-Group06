import './ResetPassword.scss'

import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import ResetPasswordBox from '../../Components/ResetPasswordBox/ResetPasswordBox';

export default function ResetPassword() {
    return (
        <div className="resetPw-page">
            <HeaderGuest />
            <ResetPasswordBox />
            <Footer />
        </div>


    );
}