import logo from '../../logo.png';
import './BookingFreelancer.scss';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import {useSelector} from 'react-redux'

export default function LicenseFreelancer(){
    const {tour_guide_by_id_guide} = useSelector(state => state.FreelancerReducer)

    return (
    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer img = {logo} fullname = {tour_guide_by_id_guide.fullname.toUpperCase()} flag1 = "focus"/>
    </div>
    )
}