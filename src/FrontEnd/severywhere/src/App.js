import './App.module.css';
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileFreelancer from "./Pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./Pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./Pages/Freelancer/StatisticsFreelancer";
import LicenseFreelancer from "./Pages/Freelancer/LicenseFreelancer";
import BookingFreelancer from "./Pages/Freelancer/BookingFreelancer";
import AboutUs_FAQ from './Pages/AboutUs_FAQ/AboutUs_FAQ';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import EditProfile from './Pages/Profile/EditProfile';
import HomePage from './Pages/HomePage/HomePage';
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate'; 
import ProfileAdmin from "./Pages/Admin/ProfileAdmin/ProfileAdmin";
import AboutUs from "./Pages/Admin/FAQ/AboutUs";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import TouristListing from './Pages/Admin/Users/Tourists/TouristListing';
import TouristDetails from './Pages/Admin/Users/Tourists/TouristDetails';
import CompanyListing from './Pages/Admin/Users/Companies/CompanyListing';
import CompanyDetails from './Pages/Admin/Users/Companies/CompanyDetails';
import FreelancerListing from './Pages/Admin/Users/Freelancers/FreelancerListing';
import FreelancerDetails from './Pages/Admin/Users/Freelancers/FreelancerDetails';
import TourListing from './Pages/Admin/Tours/TourListing';
import TourDetails from './Pages/Admin/Tours/TourDetails';
import BookingListing from './Pages/Admin/Bookings/BookingListing';
import BookingGuideDetails from './Pages/Admin/Bookings/BookingGuideDetails';
import BookingTourDetails from './Pages/Admin/Bookings/BookingTourDetails';

export const history = createBrowserHistory();
function App(){
  const role = useSelector(state => state.BasicReducer.user_login.id_role);
  return(
    <Router history={history}>
      <div className = "App">
        <Switch>
          <Route path = "/aboutus" exact component = {AboutUs_FAQ} />
          {
            (role !== 2) && (role !== 3) && (role !== 4) && (
              <Route path = "homepage" exact component={HomePage}/>
            )
          }
          {
            (role !== 1) && (role !== 2) && (role !== 3) && (role !== 4) && (
              <>
              <Route path = "/signup" exact component={Signup} />
              <Route path = "/login" exact component ={Login} />
              </>
            )
          }
          {/* {
            role === 1 && (
              <>
              <Route path = "/editprofile" exact component = {EditProfile} />
              </>
            )
          } */}
          {
            role === 3 && (
              <>
              <Route path = "/profile-freelancer" exact component ={ProfileFreelancer} />
              <Route path = "/license-freelancer" exact component ={LicenseFreelancer} />
              <Route path = "/calendar-freelancer" exact component ={CalendarFreelancer} />
              <Route path = "/booking-freelancer" exact component ={BookingFreelancer} />
              <Route path = "/statistics-freelancer" exact component ={StatisticsFreelancer} />
              </>
            )
          }
          {
            role === 4 && (
              <>
              <AdminTemplate path="/profile-admin" exact Component={ProfileAdmin}/>
              <Route path = "/aboutus-admin" exact component ={AboutUs} />
              <AdminTemplate path="/dashboard" exact Component={Dashboard}/>
              <AdminTemplate path="/tourists-admin" exact Component={TouristListing}/>
              <AdminTemplate path="/tourists-admin/:id_tourist" exact Component={TouristDetails}/>
              <AdminTemplate path="/companies-admin" exact Component={CompanyListing}/>
              <AdminTemplate path="/companies-admin/:id_company" exact Component={CompanyDetails}/>
              <AdminTemplate path="/freelancers-admin" exact Component={FreelancerListing}/>
              <AdminTemplate path="/freelancers-admin/:id_guide" exact Component={FreelancerDetails}/>
              <AdminTemplate path="/tours-admin" exact Component={TourListing}/>
              <AdminTemplate path="/tours-admin/:id_tour" exact Component={TourDetails}/>
              <AdminTemplate path="/bookings-admin" exact Component={BookingListing}/>
              <AdminTemplate path="/bookings-admin/guide/:id_guidebooking" exact Component={BookingGuideDetails}/>
              <AdminTemplate path="/bookings-admin/tour/:id_tour" exact Component={BookingTourDetails}/>
              </>
            )
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;