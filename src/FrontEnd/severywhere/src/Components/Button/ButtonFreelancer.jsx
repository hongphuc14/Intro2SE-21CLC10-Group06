import './ButtonFreelancer.scss'

export const ButtonEditFreelancer = ({name, onChange, type = "file"}) => {
    if (type === "file") 
        return <input type = "file" className = "button-edit" name = {name} onChange = {onChange} accept="image/*"/>
    else
        return <input type = {type} className = "button-edit" name = {name} onChange = {onChange}/>
}
    

export const ButtonDeleteFreelancer = ({onClick}) => 
    <button className = "button-delete" onClick = {onClick} type = "button">
        <i className="fas fa-trash-alt"></i>
    </button>

export const ButtonViewFreelancer = () => 
    <button className = "button-view" type = "button"/>

export const ButtonUploadFreelancer = ({className, title, disabled, onClick, type = "button"}) =>{
    return(
        <button type={type} className = {className} disabled={disabled} onClick = {onClick}>
            {title}
        </button>
    )
}