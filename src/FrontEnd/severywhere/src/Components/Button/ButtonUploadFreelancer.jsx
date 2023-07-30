import './ButtonUploadFreelancer.scss';

export default function ButtonUploadFreelancer({className, title, disabled, onClick}){
    return(
        <button type="button" className = {className} disabled={disabled} onClick = {onClick}>
            {title}
        </button>
    )
}