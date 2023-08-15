import './EditProfile.scss';
import HeaderGuest from '../../Components/Header/HeaderGuest';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/SideNavBar/NavBar';
import FormEdit from '../../Components/FormEdit/FormEdit';
import Avatar from '../../Components/AvatarComponent/Avatar';

export default function EditProfile() {
    return (
        <div className="editprofile-page">
            <HeaderGuest className="headerGuest"/>
            <div className="ThreeColumnLayout">
                <NavBar/>
                <div className="editprofile-content">
                    <FormEdit />
                     <div className="avatar">
                        <Avatar className="avatarcomponent"/>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
        
    );
}