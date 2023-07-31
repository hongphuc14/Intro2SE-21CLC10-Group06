import './AttractionFreelancer.scss';
import placeholder from './placeholder-image.png';
import ButtonUploadFreelancer from '../Button/ButtonUploadFreelancer'
import {ButtonEditFreelancer, ButtonDeleteFreelancer} from "../Button/ButtonFreelancer"
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AttractionFreelancer(){
    const {guide_attraction_by_id_guide} = useSelector(state => state.FreelancerReducer)
    const [attractions, setAttractions] = useState(guide_attraction_by_id_guide)

    const handleChangeAttractions = (e, type, id) => {
        
        const newAttractions = [...attractions]
        console.log(newAttractions[id-1])
        newAttractions[id-1][type] = e.target.value
        setAttractions(newAttractions)
    }

    console.log(guide_attraction_by_id_guide)

    return(
        <>
        {attractions.map((attr) =>{
            return(
                <div className = "attraction-frame" key = {attr.id_attraction}>
                    <div className = "picture">
                        <img src = {placeholder} alt = {attr.photo_path}/>
                        <div className = "picture-bg">
                            <ButtonEditFreelancer/>
                            <ButtonDeleteFreelancer/>
                        </div>
                    </div>
                    <div className = "attraction">
                        <label htmlFor = {`title${attr.id_attraction}`}>Title</label>
                        <input type = "text" id = {`title${attr.id_attraction}`} name = {`title${attr.id_attraction}`} value = {attr.title} onChange = {(e) => handleChangeAttractions(e,"title", attr.id_attraction)} required></input>
                        <label htmlFor = {`desc${attr.id_attraction}`}>Description</label>
                        <textarea type = "text" id = {`desc${attr.id_attraction}`} name = {`desc${attr.id_attraction}`} value = {attr.description} onChange = {(e) => handleChangeAttractions(e,"description", attr.id_attraction)} required></textarea>
                    </div>
                    <ButtonUploadFreelancer className="button-save" title = "SAVE" />
                    <ButtonUploadFreelancer className="button-upload" title = "DELETE" />
                </div>
            )
        }) 
        }
        </>
    )
}


        