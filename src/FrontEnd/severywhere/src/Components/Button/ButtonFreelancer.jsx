import './ButtonFreelancer.scss'

export const ButtonEditFreelancer = ({name, onChange}) => 
    <input type = "file" className = "button-edit" name = {name} onChange = {onChange}/>

export const ButtonDeleteFreelancer = () => 
    <button className = "button-delete">
        <i className="fas fa-trash-alt"></i>
    </button>

export const ButtonViewFreelancer = () => 
    <button className = "button-view"/>

export const ButtonUploadFreelancer = ({className, title, disabled, onClick, type = "button"}) =>{
    return(
        <button type={type} className = {className} disabled={disabled} onClick = {onClick}>
            {title}
        </button>
    )
}