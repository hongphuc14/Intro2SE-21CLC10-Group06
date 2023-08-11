import EmailInput from '../../Components/EmailInput/EmailInput'
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