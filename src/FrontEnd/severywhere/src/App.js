import './App.css';
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";

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
import { useSelector } from "react-redux";
export const history = createBrowserHistory();
function App(){
  const role = useSelector(state => state.BasicReducer.user_login.id_role)
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
          {
            role === 1 && (
              <>
              <Route path = "/editprofile" exact component = {EditProfile} />
              </>
            )
          }
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
              <AdminTemplate path="/profile-admin" exact Component={ProfileAdmin} />
              </>
            )
          }
        </Switch>
      </div>
    </Router>
  );
}

export default App;