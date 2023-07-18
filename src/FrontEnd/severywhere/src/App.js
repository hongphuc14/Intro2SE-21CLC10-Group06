import './App.css';
import logo from './logo.png';
import Header from './Components/Header/HeaderForHomepage';
import Navbar from './Components/Navbar/NavbarFreelancer';
import InputFieldFreelancer from './Components/InputField/InputFieldFreelancer';
import CheckBoxFreelancer from './Components/InputField/CheckBoxFreelancer';
import Avatar from './Components/Avatar/Avatar';
// import { Route, Switch, Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header/>
        <Navbar img = {logo} fullname = "Phan My Linh"/>
        <div className = "main">
          <div className = "Form">
            <InputFieldFreelancer title = "Full name" type = "text" required/>
            <InputFieldFreelancer title = "Date of birth" type = "date" required/>
            <CheckBoxFreelancer title = "Gender" type = "radio" choices = {["Male","Female"]} required/>
            <InputFieldFreelancer title = "Destination" type = "text" required/>
            <InputFieldFreelancer title = "Phone number" type = "number" />
            <CheckBoxFreelancer title = "Language" type = "checkbox" choices = {["Vietnamese","English"]} required/>
            <InputFieldFreelancer title = "Experience (years)" type = "number" required/>
            <InputFieldFreelancer title = "Description" type = "textarea"/>
          </div>
          <Avatar img = {logo} verified/>
        </div>
    </div>
  );
}

export default App;
