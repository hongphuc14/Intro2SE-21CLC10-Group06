import './App.css';
import logo from './logo.svg';
import Header from './Components/Header/HeaderForHomepage';
import Navbar from './Components/Navbar/NavbarFreelancer';
// import { Route, Switch, Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header/>
        <Navbar img = {logo} fullname = "Phan My Linh"/>
    </div>
  );
}

export default App;
