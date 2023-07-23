import './ButtonNextFreelancer.scss'

export default function ButtonNext({next, disabled}){
    return(
        <button className = "button-next" disabled={disabled}>
            {next ? (<i class="fas fa-angle-right"></i>) 
                : (<i class="fas fa-angle-left"></i>)}
        </button>
    )
}