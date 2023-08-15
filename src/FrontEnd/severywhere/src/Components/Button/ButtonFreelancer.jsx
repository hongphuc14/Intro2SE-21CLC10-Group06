import './ButtonFreelancer.scss'

export const ButtonEditFreelancer = ({name, onChange, onClick, type = "file"}) => {
    if (type === "file") 
        return <input type = "file" className = "button-edit" name = {name} onChange = {onChange} accept="image/*"/>
    else
        return (
        <button className = "button-edit" onClick = {onClick} type = "button">
            <i className ="fa-solid fa-square-pen"></i>
        </button>
    )     
    
}
    

export const ButtonDeleteFreelancer = ({onClick}) => 
    <button className = "button-delete" onClick = {onClick} type = "button">
        <i className="fas fa-trash-alt"></i>
    </button>

export const ButtonViewFreelancer = () => 
    <button className = "button-view" type = "button">
        <i className ="fa-solid fa-eye"></i>
    </button>

export const ButtonUploadFreelancer = ({className, title, disabled, onClick, type = "button"}) =>{
    return(
        <button type={type} className = {className} disabled={disabled} onClick = {onClick}>
            {title}
        </button>
    )
}