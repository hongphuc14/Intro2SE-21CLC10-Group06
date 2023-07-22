import './ButtonUploadFreelancer.scss';

export default function ButtonUploadFreelancer({className, title, disabled}){
    return(
        <button type="button" className = {className} disabled={disabled}>
            {title}
        </button>
    )
}