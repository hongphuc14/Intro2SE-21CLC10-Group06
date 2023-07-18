import './App.css';
import logo from './logo.png';
import Header from './Components/Header/HeaderForHomepage';
import Navbar from './Components/Navbar/NavbarFreelancer';
import InputFieldFreelancer from './Components/InputField/InputFieldFreelancer';
import CheckBoxFreelancer from './Components/InputField/CheckBoxFreelancer';
import Avatar from './Components/Avatar/Avatar';
import ButtonUpload from './Components/Button/ButtonUpload';
// import { Route, Switch, Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header/>
        <Navbar img = {logo} fullname = "PHAN MY LINH"/>
        <div className = "update-profile">
          <div className = "form">
            <InputFieldFreelancer title = "Full name" type = "text" required/>
            <InputFieldFreelancer title = "Date of birth" type = "date" required/>
            <CheckBoxFreelancer title = "Gender" type = "radio" choices = {["Male","Female"]} required/>
            <InputFieldFreelancer title = "Destination" type = "text" required/>
            <InputFieldFreelancer title = "Phone number" type = "number" />
            <CheckBoxFreelancer title = "Language" type = "checkbox" choices = {["Vietnamese","English"]} required/>
            <InputFieldFreelancer title = "Experience (years)" type = "number" required/>
            <InputFieldFreelancer title = "Description" type = "textarea"/>
            <div className = "input-field">
              <legend>Tourism licenses</legend>
              <ButtonUpload className="button-upload" title = "UPLOAD A LICENSE"/>
              <ButtonUpload className="button-upload" title = "VIEW ALL LICENSES"/>
            </div>
          </div>
          <Avatar img = {logo} verified/>
        </div>
        <ButtonUpload className="button-save" title = "SAVE CHANGES" disabled/>
        <div class = "hr"></div>
        <div className = "show-attraction">
          <p>Must-see attractions</p>
        </div>
    </div>
  );
}

export default App;
