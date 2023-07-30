import logo from '../../logo.png';
import "./CalendarFreelancer.scss";
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonNextFreelancer from '../../Components/Button/ButtonNextFreelancer';
import { useSelector } from 'react-redux';

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

  const dates = [{day: 3, month: "July", focus: false},
                {day: 4, month: "July", focus: false},
                {day: 5, month: "July", focus: true},
                {day: 6, month: "July", focus: false},
                {day: 7, month: "July", focus: false},
                {day: 8, month: "July", focus: false},
                {day: 9, month: "July", focus: false}]

export default function CalendarFreelancer(){  
    const {verified} = useSelector(state => state.FreelancerReducer)

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
                        <div className = "check-box-calendar">
                            <input id = "morning" type = "checkbox" name = "session" value = "morning" disabled></input>
                            <label htmlFor="morning">Morning (7:00 - 11:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "afternoon" type = "checkbox" name = "session" value = "afternoon"></input>
                            <label htmlFor="afternoon">Afternoon (13:00 - 17:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "evening" type = "checkbox" name = "session" value = "evening"></input>
                            <label htmlFor="evening">Evening (18:00 - 21:00)</label>
                        </div>
                    </div>
                </div>
                <div className = "input-field">
                    <label htmlFor="price_session">
                        Price per session ($)
                        <p> * </p>
                    </label>
                    <input id = "price_session" type = "number" required ></input>
                </div>
                <input type="checkbox" id="free-cancallation"></input>
                <label htmlFor="free-cancallation">Free cancellation up to 24 hours before the start time</label>
                </div>
            ):
            (
                <div className = "main-calendar">
                <p className = "welcome">Welcome to Set Calendar</p>
                <p>You have to upload legitimate tourism licenses to unlock this section</p>
                </div>
            )
            }   
        </div>
    )
}