import './App.css';
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";

import ProfileFreelancer from "./pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./pages/Freelancer/StatisticsFreelancer";
import LicenseFreelancer from "./pages/Freelancer/LicenseFreelancer";
import BookingFreelancer from "./pages/Freelancer/BookingFreelancer";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import EditProfile from './pages/Profile/EditProfile';

import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate'; 
import ProfileAdmin from "./pages/Admin/ProfileAdmin/ProfileAdmin";

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
          <Route path = "/signup" exact component={Signup} />
          <Route path = "/login" exact component ={Login} />
          <Route path = "/editprofile" exact component = {EditProfile} />

          <AdminTemplate path="/profile-admin" exact Component={ProfileAdmin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;