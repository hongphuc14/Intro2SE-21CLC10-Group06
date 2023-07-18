import "./CheckBoxFreelancer.scss"

export default function CheckBoxFreelancer({type, title, required = false, choices}){
    return(
        <div className = "check-box">
            <legend>
                {title}{required && <p> * </p>}
            </legend>
            {choices.map(choice =>{
            return (
                <>
                    <input id = {choice} type = {type} name = {title} value = {choice}></input>
                    <label htmlFor={choice}>{choice}</label>
                </>
                )
            })}
        </div>
    )
}