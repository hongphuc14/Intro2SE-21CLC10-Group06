import placeholder from '../../placeholder-image.png'
import "./CalendarFreelancer.scss";
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonNextFreelancer from '../../Components/Button/ButtonNextFreelancer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month_of_year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function Day({day, week, month,focus, onClick}){
    return(
        <button className ={focus ? "date focus" : "date"} onClick = {onClick}>
        <p>{week}</p>
        <p>{day}</p>
        <p>{month_of_year[month]}</p>
        </button>
  )
}

export default function CalendarFreelancer(){  
    const {verified, guide_time_by_id_guide, tour_guide_by_id_guide} = useSelector(state => state.FreelancerReducer)

    const [next, setNext] = useState(0)

    const dates = []
    const currentDate = new Date()
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i + 7 * next);
        dates.push({week: day_of_week[date.getDay()], day: date.getDate(), month: date.getMonth(), year: date.getFullYear()});
    }
    
    const [no, setNo] = useState(0)
    console.log(dates[no])
    const checkExist = (session) => {
        if ( no !== ""){
            const dateStr = `${dates[no].year}-${dates[no].month < 10 ? '0' : ''}${dates[no].month + 1}-${dates[no].day < 10 ? '0' : ''}${dates[no].day}`;
            return (guide_time_by_id_guide.some((time)=> {
                // console.log(time.guide_date, dateStr);
                // console.log(time.guide_session, session);
                // console.log(time.guide_date === dateStr && time.guide_session === session)
                return time.guide_date === dateStr && time.guide_session === session
            }))
        }
        return false
    }
    const [price, setPrice] = useState(tour_guide_by_id_guide.price_per_session.toFixed(2))
    const [cancel, setCancel] = useState(tour_guide_by_id_guide.free_cancellation)
    // khi nào mới gửi action
    // console.log(price, cancel)

    return (
        <div className = "calendar-freelancer">
            <HeaderFreelancer/>
            <NavbarFreelancer src = {placeholder} fullname ={tour_guide_by_id_guide.fullname.toUpperCase()} flag2 = "focus"/>
            {verified ? (
                <div className = "main-calendar">
                <div className = "select-date">
                    <p>Select the date you want to schedule</p>
                    <ButtonNextFreelancer onClick = {() => {setNext(next-1); setNo("")}} disabled = {next === 0}/>
                    <div className = "list-date">
                    {
                        dates.map((date,index)=>{
                            return <Day key={`${date.day}-${date.month}`} {...date} focus = {index === no} onClick = {() => {setNo(index)}}/>
                        })
                    }
                    </div>
                    <ButtonNextFreelancer onClick = {() => {setNext(next+1); setNo("")}}  next/>
                </div>
                <div className = "select-session">
                    <p>Select the available session</p>
                    <div className = "list-session">
                        <div className = "check-box-calendar">
                            <input id = "morning" type = "checkbox" name = "session" value = {1} checked = {checkExist(1)}></input>
                            <label htmlFor="morning">Morning (7:00 - 11:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "afternoon" type = "checkbox" name = "session" value = {2} checked = {checkExist(2)}></input>
                            <label htmlFor="afternoon">Afternoon (13:00 - 17:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "evening" type = "checkbox" name = "session" value = {3} checked = {checkExist(3)}></input>
                            <label htmlFor="evening">Evening (18:00 - 21:00)</label>
                        </div>
                    </div>
                </div>
                <div className = "input-field">
                    <label htmlFor="price_session">
                        Price per session ($)
                        <p> * </p>
                    </label>
                    <input id = "price_session" type = "number" name = "price" value = {price} onChange = {(e) => setPrice(e.target.value)} required ></input>
                </div>
                <input type="checkbox" id="free-cancallation" checked = {cancel} onChange = {(e) => setCancel(!cancel)}></input>
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