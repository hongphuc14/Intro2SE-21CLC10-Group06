import './App.css';
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import ProfileFreelancer from "./pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./pages/Freelancer/StatisticsFreelancer";
import LicenseFreelancer from "./pages/Freelancer/LicenseFreelancer";
import BookingFreelancer from "./pages/Freelancer/BookingFreelancer";
import ProfileCompany from './pages/Company/ProfileCompany';
import TourCompany from './pages/Company/TourCompany';
import StatisticsCompany from './pages/Company/StatisticCompany';

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

          {/* <Route path = "/profile-company" exact component ={ProfileCompany} />
          <Route path = "/tour-company" exact component ={TourCompany} /> */}
          {/* <Route path = "/booking-company" exact component ={BookingCompany} /> */}
          {/* <Route path = "/statistics-company" exact component ={StatisticsCompany} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
