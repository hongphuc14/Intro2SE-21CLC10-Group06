import EmailInput from '../../Components/EmailInputResetPw/EmailInputResetPw'
import './ResetPasswordEmail.scss'
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';

export default function ResetPasswordEmail() {
    return (
        <div className="emailInput-resetPw-page">
            <HeaderGuest />
            <EmailInput />
            <Footer />
        </div>
    );
}