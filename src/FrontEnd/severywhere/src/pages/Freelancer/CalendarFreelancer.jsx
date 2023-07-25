import logo from '../../logo.png';
import "./CalendarFreelancer.scss";
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonNextFreelancer from '../../Components/Button/ButtonNextFreelancer';
import InputFieldFreelancer from '../../Components/InputField/InputFieldFreelancer';
import CheckBoxCalendar from '../../Components/InputField/CheckBoxCalendar';

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

const verified = true;
  const dates = [{day: 3, month: "July", focus: false},
                {day: 4, month: "July", focus: false},
                {day: 5, month: "July", focus: true},
                {day: 6, month: "July", focus: false},
                {day: 7, month: "July", focus: false},
                {day: 8, month: "July", focus: false},
                {day: 9, month: "July", focus: false}]

function CalendarFreelancer(){  
    return (
        <div className = "calendar-freelancer">
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
    )
}

export default CalendarFreelancer