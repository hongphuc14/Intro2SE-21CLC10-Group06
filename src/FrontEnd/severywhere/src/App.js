import './App.css';
// import Navbar from './Components/Header/HeaderGuest';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import EditProfile from './Pages/Profile/EditProfile';
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
      </Switch>
    </div>
  </Router>
  );
}

export default App;