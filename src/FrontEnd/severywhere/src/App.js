import './App.css';
import logo from './logo.png';
import HeaderFreelancer from './Components/Header/HeaderFreelancer';
import NavbarFreelancer from './Components/Navbar/NavbarFreelancer';
import ButtonNextFreelancer from './Components/Button/ButtonNextFreelancer';
import InputFieldFreelancer from './Components/InputField/InputFieldFreelancer';
import CheckBoxCalendar from './Components/InputField/CheckBoxCalendar';

// import InputFieldFreelancer from './Components/InputField/InputFieldFreelancer';
// import CheckBoxFreelancer from './Components/InputField/CheckBoxFreelancer';
// import PhotoFreelancer from './Components/Photo/PhotoFreelancer';
// import ButtonUploadFreelancer from './Components/Button/ButtonUploadFreelancer';
// import AttractionFreelancer from './Components/Attraction/AttractionFreelancer';

// import { Route, Switch, Router } from "react-router-dom";

const day_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function Date({day,month,index,focus}){
  return(
    <button className ={focus ? "date focus" : "date"}>
      <p>{day_of_week[index]}</p>
      <p>{day}</p>
      <p>{month}</p>
    </button>
  )
}

function App() {
  // const attractions = [
  //   {
  //     img: logo,
  //     title: 'abc',
  //     description: 'abc'
  //   },
  //   {
  //     img: logo,
  //     title: 'abc',
  //     description: 'abc'
  //   },
  // ]
  const verified = true;
  const dates = [{day: 3, month: "July", focus: false},
                {day: 4, month: "July", focus: false},
                {day: 5, month: "July", focus: true},
                {day: 6, month: "July", focus: false},
                {day: 7, month: "July", focus: false},
                {day: 8, month: "July", focus: false},
                {day: 9, month: "July", focus: false}]
  
  return (
    // <div className="App">
    //     <HeaderFreelancer/>
    //     <NavbarFreelancer img = {logo} fullname = "PHAN MY LINH" flag1 = "focus"/>
    //     <div className = "main-profile">
    //       <div className = "update-profile">
    //         <div className = "form-profile">
    //           <InputFieldFreelancer title = "Full name" type = "text" required/>
    //           <InputFieldFreelancer title = "Date of birth" type = "date" required/>
    //           <CheckBoxFreelancer title = "Gender" type = "radio" choices = {["Male","Female"]} required/>
    //           <InputFieldFreelancer title = "Destination" type = "text" required/>
    //           <InputFieldFreelancer title = "Phone number" type = "number" />
    //           <CheckBoxFreelancer title = "Language" type = "checkbox" choices = {["Vietnamese","English"]} required/>
    //           <InputFieldFreelancer title = "Experience (years)" type = "number" required/>
    //           <InputFieldFreelancer title = "Description" type = "textarea"/>
    //           <div className = "input-field">
    //             <legend>Tourism licenses</legend>
    //             <ButtonUploadFreelancer className="button-upload" title = "UPLOAD A LICENSE"/>
    //             <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES"/>
    //           </div>
    //         </div>
    //         <PhotoFreelancer img = {logo} verified/>
    //       </div>
    //       <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" disabled/>

    //       <div class = "hr"></div>

    //       <div className = "show-attraction">
    //         <p>Must-see attractions</p>
    //         {attractions.map((attraction,index) => <AttractionFreelancer {...attraction} index={index}/>)}
    //         <AttractionFreelancer />
    //         <ButtonUploadFreelancer className="button-save" title = "ADD" disabled/>
    //         <ButtonUploadFreelancer className="button-upload" title = "DELETE" />
    //       </div>

    //       <div class = "hr"></div>
    //       <div className = "setting">
    //         <div className = "info">
    //           <InputFieldFreelancer title = "Email addess" type = "email" required/>
    //           <InputFieldFreelancer title = "Password" type = "password" required/>
    //           {/* <ButtonUploadFreelancer className="button-upload" title = "CHANGE PASSWORD" /> */}
    //           <ButtonUploadFreelancer className="button-upload" title = "BACK" />
    //         </div>
    //         <div className = "change-pass">
    //           <InputFieldFreelancer title = "Current password" type = "password" required disabled/>
    //           <InputFieldFreelancer title = "New password" type = "password" required disabled/>
    //           <InputFieldFreelancer title = "Confirm password" type = "password" required disabled/>
    //         </div>
    //       </div>

    //       <div class = "hr"></div>      

    //       <a href = "https://www.google.com/" className = "delete-acc">Delete account</a>
    //       <a href = "https://www.google.com/" className = "log-out">Log out</a>        
    //     </div>
    // </div>
      <div className = "App">
         <HeaderFreelancer/>
         <NavbarFreelancer img = {logo} fullname = "PHAN MY LINH" flag2 = "focus"/>
            {verified ? (
              <div className = "main-calendar">
                <div className = "select-date">
                  <p>Select the date you want to schedule</p>
                  <ButtonNextFreelancer disabled/>
                  <div className = "list-date">
                  {
                    dates.map((date,index)=>{
                      return <Date key={date.day} {...date} index = {index}/>
                    })
                  }
                  </div>
                  <ButtonNextFreelancer next/>
                </div>
                <div className = "select-session">
                  <p>Select the available session</p>
                  <div className = "list-session">
                    <CheckBoxCalendar session = "Morning" des="(7:00 - 11:00)" disabled />
                    <CheckBoxCalendar session = "Afternoon" des="(13:00 - 17:00)" />
                    <CheckBoxCalendar session = "Evening" des="(18:00 - 21:00)"/>
                  </div>
                </div>
                <InputFieldFreelancer title = "Price per session ($)" type = "number" required/>
                <input type="checkbox" id="free-cancallation"></input>
                <label htmlFor="free-cancallation">Free cancellation up to 24 hours before the start time</label>
                
              </div>
            ):
            (
              <div className = "main-calendar">
                <p className = "welcome">Welcome to Manage Tour</p>
                <p>You have to upload legitimate tourism licenses to unlock this section</p>
              </div>
            )
            }   
      </div>
  );
}

export default App;
