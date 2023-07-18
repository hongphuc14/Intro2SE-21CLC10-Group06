import './ButtonUpload.scss';

export default function ButtonUpload({className, title, disabled}){
    return(
        <button type="button" className = {className} disabled={disabled}>
            {title}
        </button>
    )
}