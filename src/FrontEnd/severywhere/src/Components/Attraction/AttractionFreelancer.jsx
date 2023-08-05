import './AttractionFreelancer.scss';
import placeholder from '../../placeholder-image.png';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../Button/ButtonFreelancer"
import { useState, useEffect, useLayoutEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import {getGuideAttractionByIdGuide, updateGuideAttractionByIdGuide} from '../../redux/actions/FreelancerAction'
import ErrorInput from '../Message/ErrorInput';

export default function AttractionFreelancer({id_guide}){
    const [attractions, setAttractions] = useState(null)
    const dispatch = useDispatch()
    const guide_attractions = useSelector(state => state.FreelancerReducer.guide_attraction_by_id_guide )

    useEffect(() => {
        dispatch(getGuideAttractionByIdGuide(id_guide))
    },[dispatch])

    useEffect(() => {
        if (!attractions) {
            setAttractions(guide_attractions);
          }
    },[guide_attractions])
    
    console.log(attractions)
    const importImage = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
            return null
        const path = require(`../../../public/freelancer_avatar/${filename}`)
        return path
    }
    
    const loadLicense = (file) =>{
        if (file){
          return URL.createObjectURL(file);
        }
        return null
      }

    const handleChangeInfo = (e, type, id) => {
        const newAttractions = [...attractions]
        // console.log(newAttractions[id])
        newAttractions[id][type] = e.target.value
        setAttractions(newAttractions)
    }

    const [errorImage, setErrorImage] = useState (null)
    const handleChangeImage = (e, id) =>{
        if (e.target.files[0] && e.target.files[0].type.startsWith('image/')){
            const newAttraction = [...attractions]
            newAttraction[id] = {...newAttraction[id], photo_path: e.target.files[0].name, file: e.target.files[0]}
            setAttractions(newAttraction)
            setErrorImage(null)
        }
        else if (e.target.files[0] && !e.target.files[0].type.startsWith('image/'))
        setErrorImage({name: e.target.name, error: 'Uploaded file must be an image file (.jpg, .png, .jpeg)'})     
        }

    const handleSave = () => {
        dispatch(updateGuideAttractionByIdGuide(id_guide, attractions))
    }

    console.log(attractions)
    if (attractions)
    return(
        <>
            <div className = "attraction-frame" key = {1}>
                <div className = "picture">
                    <img src = {loadLicense(attractions[0]?.file) || importImage(attractions[0]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer onChange = {(e) => handleChangeImage(e,0)}/>
                        <ButtonDeleteFreelancer/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title1">Title</label>
                    <input type = "text" id = "title1" name = "title1" value = {attractions[0]?.title} onChange = {(e) => handleChangeInfo(e,"title", 0)}></input>
                    <label htmlFor = "desc1">Description</label>
                    <textarea type = "text" id = "desc1" name = "desc1" value = {attractions[0]?.description} onChange = {(e) => handleChangeInfo(e,"description", 0)} ></textarea>
                </div>
                {/* <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSave}/> */}
            </div>
            <div className = "attraction-frame" key = {2}>
                <div className = "picture">
                    <img src = {importImage(attractions[1]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer/>
                        <ButtonDeleteFreelancer/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title2">Title</label>
                    <input type = "text" id = "title2" name = "title2" value = {attractions[1]?.title} onChange = {(e) => handleChangeInfo(e,"title", 1)}></input>
                    <label htmlFor = "desc2">Description</label>
                    <textarea type = "text" id = "desc2" name = "desc2" value = {attractions[1]?.description} onChange = {(e) => handleChangeInfo(e,"description", 1)} ></textarea>
                </div>
                {/* <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSave}/> */}
            </div>
            <div className = "attraction-frame" key = {3}>
                <div className = "picture">
                    <img src = {importImage(attractions[2]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer/>
                        <ButtonDeleteFreelancer/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title3">Title</label>
                    <input type = "text" id = "title3" name = "title3" value = {attractions[2]?.title} onChange = {(e) => handleChangeInfo(e,"title", 2)}></input>
                    <label htmlFor = "desc3">Description</label>
                    <textarea type = "text" id = "desc3" name = "desc3" value = {attractions[2]?.description} onChange = {(e) => handleChangeInfo(e,"description", 2)} ></textarea>
                </div>
                {/* <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSave}/> */}
            </div>
            <ButtonUploadFreelancer className="button-save" title = "SAVE ALL CHANGES" onClick = {handleSave}/>
        </>
    )
}


        