import './AttractionFreelancer.scss';
import placeholder from '../../placeholder-image.png';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../Button/ButtonFreelancer"
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AttractionFreelancer(){
    const {guide_attraction_by_id_guide} = useSelector(state => state.FreelancerReducer)
    const [attractions, setAttractions] = useState(guide_attraction_by_id_guide)
    const [attractionFrame, setAttractionFrame] = useState(new Array(attractions.length).fill(false))

    const handleChangeAttractions = (e, type, id) => {
        const newAttractions = [...attractions]
        console.log(newAttractions[id-1])
        newAttractions[id-1][type] = e.target.value
        setAttractions(newAttractions)
    }

    const handleMouseEnter = (id) => {
        // if (!attractionFrame.some(frame => frame === true)){
        //     const newFrame = [...attractionFrame]
        //     newFrame[id-1] = true
        //     setAttractionFrame([...newFrame])
        // }
    }

    const handleSaveButton = () => {
        setAttractionFrame(false)
    }

    // console.log(attractionFrame)

    return(
        <>
        {attractions.map((attr) =>{
            return(
                <div className = {attractionFrame[attr.id_attraction-1] ? "attraction-frame focus" : "attraction-frame"} key = {attr.id_attraction}
                    onMouseEnter={() => {handleMouseEnter(attr.id_attraction)}}>
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
                    <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSaveButton}/>
                    <ButtonUploadFreelancer className="button-upload" title = "DELETE" />
                </div>
            )
        }) 
        }
        </>
    )
}


        