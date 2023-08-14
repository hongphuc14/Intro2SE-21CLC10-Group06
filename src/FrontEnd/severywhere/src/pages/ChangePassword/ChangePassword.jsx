import './ChangePassword.scss'
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/SideNavBar/NavBar';
import ChangePasswordForm from '../../Components/ChangePasswordForm/ChangePasswordForm';

export default function ChangePassword() {
    return (
        <div className="changePw-page">
            <HeaderGuest />
            <div className="twoColumn">
                <NavBar />
                <ChangePasswordForm/>
            </div>
            <Footer />
        </div>
    );
}