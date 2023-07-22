import './App.css';
import logo from './logo.png';
import HeaderFreelancer from './Components/Header/HeaderFreelancer';
import NavbarFreelancer from './Components/Navbar/NavbarFreelancer';
import InputFieldFreelancer from './Components/InputField/InputFieldFreelancer';
import CheckBoxFreelancer from './Components/InputField/CheckBoxFreelancer';
import PhotoFreelancer from './Components/Photo/PhotoFreelancer';
import ButtonUploadFreelancer from './Components/Button/ButtonUploadFreelancer';
import AttractionFreelancer from './Components/Attraction/AttractionFreelancer';
// import { Route, Switch, Router } from "react-router-dom";

function App() {
  const attractions = [
    {
      img: logo,
      title: 'abc',
      description: 'abc'
    },
    {
      img: logo,
      title: 'abc',
      description: 'abc'
    },
  ]
  return (
    <div className="App">
        <HeaderFreelancer/>
        <NavbarFreelancer img = {logo} fullname = "PHAN MY LINH"/>
        <div className = "main">
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
                <ButtonUploadFreelancer className="button-upload" title = "UPLOAD A LICENSE"/>
                <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES"/>
              </div>
            </div>
            <PhotoFreelancer img = {logo} verified/>
          </div>
          <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" disabled/>

          <div class = "hr"></div>

          <div className = "show-attraction">
            <p>Must-see attractions</p>
            {attractions.map((attraction,index) => <AttractionFreelancer {...attraction} {...index}/>)}
            <AttractionFreelancer />
            <ButtonUploadFreelancer className="button-save" title = "ADD" disabled/>
            <ButtonUploadFreelancer className="button-upload" title = "DELETE" />
          </div>

          <div class = "hr"></div>
          <div className = "setting">
            <div className = "info">
              <InputFieldFreelancer title = "Email addess" type = "email" required/>
              <InputFieldFreelancer title = "Password" type = "password" required/>
              {/* <ButtonUploadFreelancer className="button-upload" title = "CHANGE PASSWORD" /> */}
              <ButtonUploadFreelancer className="button-upload" title = "BACK" />
            </div>
            <div className = "change-pass">
              <InputFieldFreelancer title = "Current password" type = "password" required disabled/>
              <InputFieldFreelancer title = "New password" type = "password" required disabled/>
              <InputFieldFreelancer title = "Confirm password" type = "password" required disabled/>
            </div>
            <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" disabled />
          </div>

          <div class = "hr"></div>      

          <a href = "https://www.google.com/" className = "delete-acc">Delete account</a>
          <a href = "https://www.google.com/" className = "log-out">Log out</a>        
        </div>
    </div>
  );
}

export default App;
