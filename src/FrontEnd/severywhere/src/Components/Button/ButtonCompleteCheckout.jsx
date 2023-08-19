import './ButtonCompleteCheckout.scss'

export const ButtonCompleteCheckout = ({onClick, text, active = true}) => 
    <button className = {`button-complete-checkout ${active ?'active':''}`} onClick = {onClick} type = "button">
        <span>
            {text}
        </span>
    </button>
