import './EditProfile.scss';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/SideNavBar/NavBar';

export default function EditProfile(){
    return(
        <div className="editprofile-page">
            <HeaderGuest/>
            <NavBar/>
            <Footer/>
        </div>
    )
}