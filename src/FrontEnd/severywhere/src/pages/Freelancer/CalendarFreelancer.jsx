import placeholder from '../../placeholder-image.png'
import "./CalendarFreelancer.scss";
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonNextFreelancer from '../../Components/Button/ButtonNextFreelancer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
//import {getGuideLicenseByIdGuide,getGuideTimeByIdGuide, updateGuideInfo, updateGuideTimeByIdGuide, deleteGuideTimeByIdGuide, addGuideTimeByIdGuide } from '../../redux/actions/FreelancerAction';
import {getGuideLicenseByIdGuide,getGuideTimeByIdGuide, updateGuideInfo, deleteGuideTimeByIdGuide, addGuideTimeByIdGuide } from '../../redux/actions/FreelancerAction'

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
    const dispatch = useDispatch() 
    
    const {verified, guide_time_by_id_guide, guide_info} = useSelector(state => state.FreelancerReducer)

    const importAvatar = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        const path = require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
        return path
    }

    useEffect(() => {
        dispatch(getGuideLicenseByIdGuide(guide_info.id_guide))
        dispatch(getGuideTimeByIdGuide(guide_info.id_guide))
      }, [dispatch, guide_info.id_guide] )

    const [next, setNext] = useState(0)

    const dates = []
    const currentDate = new Date()
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i + 7 * next);
        dates.push({week: day_of_week[date.getDay()], day: date.getDate(), month: date.getMonth(), year: date.getFullYear()});
    }
    
    const [no, setNo] = useState(0)

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
    const handleSession = (session) => {
        const dateStr = `${dates[no].year}-${dates[no].month < 10 ? '0' : ''}${dates[no].month + 1}-${dates[no].day < 10 ? '0' : ''}${dates[no].day}`;
        console.log(dateStr, session); 
        const isExist = (guide_time_by_id_guide.some((time)=> {
            return time.guide_date === dateStr && time.guide_session === session
        }))
        if (isExist)
            dispatch(deleteGuideTimeByIdGuide(guide_info.id_guide, dateStr, session))
        else 
            dispatch(addGuideTimeByIdGuide(guide_info.id_guide, dateStr, session))
    }

    const [price, setPrice] = useState(parseFloat(guide_info.price_per_session).toFixed(2))
    const savePrice = () => {
        guide_info.price_per_session = parseFloat(price)
        dispatch(updateGuideInfo(guide_info.id_guide, guide_info))
    }

    const [cancel, setCancel] = useState(guide_info.free_cancellation)
    const saveCancel = () => {
        setCancel(!cancel)
        guide_info.free_cancellation = !cancel
        dispatch(updateGuideInfo(guide_info.id_guide, guide_info))
    }
    console.log(price, cancel)

    return (
        <div className = "calendar-freelancer">
            <HeaderFreelancer/>
            <NavbarFreelancer src = {importAvatar(guide_info.avatar) || placeholder} fullname ={guide_info.fullname.toUpperCase()} flag2 = "focus"/>
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
                            <input id = "morning" type = "checkbox" name = "session" value = {1} checked = {checkExist(1)} onChange = {() => handleSession(1)}></input>
                            <label htmlFor="morning">Morning (7:00 - 11:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "afternoon" type = "checkbox" name = "session" value = {2} checked = {checkExist(2)} onChange = {() => handleSession(2)}></input>
                            <label htmlFor="afternoon">Afternoon (13:00 - 17:00)</label>
                        </div>
                        <div className = "check-box-calendar">
                            <input id = "evening" type = "checkbox" name = "session" value = {3} checked = {checkExist(3)} onChange = {() => handleSession(3)}></input>
                            <label htmlFor="evening">Evening (18:00 - 21:00)</label>
                        </div>
                    </div>
                </div>
                <div className = "input-field">
                    <label htmlFor="price_session">
                        Price per session ($)
                        <p> * </p>
                    </label>
                    <input id = "price_session" type = "number" name = "price" value = {price} onChange = {(e) => setPrice(e.target.value)} onBlur = {savePrice} required ></input>
                </div>
                <input type="checkbox" id="free-cancallation" checked = {cancel} onChange = {saveCancel}></input>
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