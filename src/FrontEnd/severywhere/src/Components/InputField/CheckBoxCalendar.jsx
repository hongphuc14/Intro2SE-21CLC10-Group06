import './CheckBoxCalendar.scss';

export default function CheckBoxCalendar({session, des, disabled}){
    return(
        <div className = "check-box-calendar">
            <input id = {session} type = "checkbox" name = "session" value = {session} disabled={disabled}></input>
            <label htmlFor={session}>{`${session} ${des}`}</label>
        </div>
    )
}