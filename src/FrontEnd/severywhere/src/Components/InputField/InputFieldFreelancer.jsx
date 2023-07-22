import "./InputFieldFreelancer.scss";

export default function InputFieldFreelancer({ title, type, required = false, disabled = false}){
    if (type !== "textarea")
        return(
            <div className = "input-field">
                <label htmlFor={title} className = {disabled && "disabled"}>
                    {title}
                    {required && <p> * </p>}
                </label>
                <input id = {title} type = {type} required = {required} disabled = {disabled}></input>
            </div>
        )
    else
        return(
            <div className = "input-field">
                <label htmlFor={title}>
                    {title}
                    {required && <p> * </p>}
                </label>
                <textarea id = {title} type = {type}></textarea>
            </div>
        )
}

