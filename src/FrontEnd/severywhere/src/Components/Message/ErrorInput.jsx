import './ErrorInput.scss'

export default function ErrorInput({mess, hidden}){
    return (
        <div className = {hidden ? "error-input hidden" : "error-input"}>
            <p>{mess}</p>
        </div>
    )
}