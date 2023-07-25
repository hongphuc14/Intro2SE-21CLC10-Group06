import './App.css';
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import ProfileFreelancer from "./pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./pages/Freelancer/StatisticsFreelancer";

export const history = createBrowserHistory();

function App(){
  return(
    // <div className = "App">
    //   <ProfileFreelancer/>
    // </div>
    <Router history={history}>
      <div className = "App">
        <Switch>
          <Route path = "/profile-freelancer" exact component ={ProfileFreelancer} />
          <Route path = "/calendar-freelancer" exact component ={CalendarFreelancer} />
          <Route path = "/statistics-freelancer" exact component ={StatisticsFreelancer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
