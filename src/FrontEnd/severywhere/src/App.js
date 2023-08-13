import './App.css';
<<<<<<< HEAD
// import Navbar from './Components/Header/HeaderGuest';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import EditProfile from './Pages/Profile/EditProfile';
import ResetPasswordEmail from './Pages/ResetPasswordEmail/ResetPasswordEmail';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import AboutUs_FAQ from './Pages/AboutUs_FAQ/AboutUs_FAQ';
import {Route, Switch, Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

// import Header from './Components/Header/HeaderForHomepage';

// import {  } from "react-router-dom";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
    <div className = "App">
      <Switch>
        <Route path = "/signup" exact component={Signup} />
        <Route path = "/login" exact component ={Login} />
        <Route path = "/editprofile" exact component = {EditProfile} />
        <Route path = "/emailResetpw" exact component = {ResetPasswordEmail} />
        <Route path = "/resetpw" exact component = {ResetPassword} />
        <Route path = "/changepw" exact component = {ChangePassword} />
        <Route path = "/aboutus" exact component = {AboutUs_FAQ} />
      </Switch>
    </div>
  </Router>
=======
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import ProfileFreelancer from "./pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./pages/Freelancer/StatisticsFreelancer";
import LicenseFreelancer from "./pages/Freelancer/LicenseFreelancer";
import BookingFreelancer from "./pages/Freelancer/BookingFreelancer";
import ProfileCompany from './pages/Company/ProfileCompany';
import LicenseCompany from './pages/Company/LicenseCompany';
import TourCompany from './pages/Company/TourCompany';
import StatisticsCompany from './pages/Company/StatisticCompany';
import BookingCompany from './pages/Company/BookingCompany';
import ReviewCompany from './pages/Company/ReviewCompany';

export const history = createBrowserHistory();

function App(){
  return(
    <Router history={history}>
      <div className = "App">
        <Switch>
          <Route path = "/profile-freelancer" exact component ={ProfileFreelancer} />
          <Route path = "/license-freelancer" exact component ={LicenseFreelancer} />
          <Route path = "/calendar-freelancer" exact component ={CalendarFreelancer} />
          <Route path = "/booking-freelancer" exact component ={BookingFreelancer} />
          <Route path = "/statistics-freelancer" exact component ={StatisticsFreelancer} />

          <Route path = "/profile-company" exact component ={ProfileCompany} />
          <Route path = "/license-company" exact component ={LicenseCompany} />
          <Route path = "/tour-company" exact component ={TourCompany} />
          <Route path = "/statistics-company" exact component ={StatisticsCompany} />
          <Route path = "/booking-company" exact component ={BookingCompany} />
          <Route path = "/review-company" exact component ={ReviewCompany} />
        </Switch>
      </div>
    </Router>
>>>>>>> 65a54289b64b69b36f7f9608fdad89e6a93459d2
  );
}

export default App;