import './AttractionFreelancer.scss';
import placeholder from './placeholder-image.png';

function EditIcon(){
    return(
        <div className ="icon">
            <i class="fas fa-edit"></i>
        </div>
    )
}

function TrashIcon(){
    return(
        <div className ="icon">
            <i class="fas fa-trash-alt"></i>
        </div>
    )
}

export default function AttractionFreelancer({img = placeholder, title, description, index}){
    return(
        <div className = "attraction-frame">
            <div className = "picture">
                <img src = {img} alt = "attraction"/>
                <div className = "picture-bg">
                    <EditIcon/>
                    <TrashIcon/>
                </div>
            </div>
            <div className = "attraction">
                <label htmlFor = {`title${index}`}>Title</label>
                <input type = "text" id = {`title${index}`} required></input>
                <label htmlFor = {`desc${index}`}>Description</label>
                <textarea type = "text" id = {`desc${index}`} required></textarea>
            </div>
        </div>
    )
}