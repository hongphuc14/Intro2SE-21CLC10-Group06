import './ButtonNextFreelancer.scss'

export default function ButtonNext({next, disabled, onClick}){
    return(
        <button className = "button-next" disabled={disabled} onClick = {onClick}>
            {next ? (<i className="fas fa-angle-right"></i>) 
                : (<i className="fas fa-angle-left"></i>)}
        </button>
    )
}