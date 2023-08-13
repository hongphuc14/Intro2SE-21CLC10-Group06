import './AttractionFreelancer.scss';
import placeholder from '../../placeholder-image.png';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../Button/ButtonFreelancer"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGuideAttractionByIdGuide, updateGuideAttractionByIdGuide} from '../../redux/actions/FreelancerAction'
import ErrorInput from '../Message/ErrorInput';

// photo_path -> "" -> delete
// file -> null -> no update image
const attractionsDefault = [
    {id_attraction: '', photo_path: '', content: '', title: '', file: null},
    {id_attraction: '', photo_path: '', content: '', title: '', file: null},
    {id_attraction: '', photo_path: '', content: '', title: '', file: null}
]

export default function AttractionFreelancer(){
    
    const dispatch = useDispatch()
    const {guide_info} = useSelector(state => state.FreelancerReducer)
    const guide_attractions = useSelector(state => state.FreelancerReducer.guide_attraction_by_id_guide )
    const [attractions, setAttractions] = useState(attractionsDefault)
    
    useEffect(() => {
        if (guide_info.id_guide)
            dispatch(getGuideAttractionByIdGuide(guide_info.id_guide))
    },[guide_info.id_guide])

    useEffect(() => {
        const tmp = [...attractions]
        if (guide_attractions[0])
            tmp[0] = {...guide_attractions[0]}
        if (guide_attractions[1])
            tmp[1] = {...guide_attractions[1]}
        if (guide_attractions[2])
            tmp[2] = {...guide_attractions[2]}
        setAttractions(tmp);
    },[guide_attractions])
    
    // console.log(attractions)
    const importImage = (filename) => {
        // console.log(filename)
        if (typeof filename === 'undefined' || filename === "")
            return null
        try{
            const path = require(`../../../../../BackEnd/public/attraction/${filename}`)
            return path
        }
        catch(err){
            console.log(err)
        }
        
    }
    
    const loadLicense = (file) =>{
        if (file){
          return URL.createObjectURL(file);
        }
        return null
      }

    const [saveChange, setSaveChange] = useState (false)

    const [err, setErr] = useState([{img: "", title: "", content: ""},{img: "", title: "", content: ""},{img: "", title: "", content: ""}])

    const handleChangeInfo = (e, type, id) => {
        if (e.target.value.length > 50 && type === "title"){
            const newErr = [...err]
            newErr[id][type] = "Title has the maximum length of 50 characters"
            setErr(newErr)
            setSaveChange(false)
        }
        else if (e.target.value.length > 500 && type !== "title"){
            const newErr = [...err]
            newErr[id][type] = "Content has the maximum length of 500 characters"
            setErr(newErr)
            setSaveChange(false)
        }
        else{
            const newAttractions = [...attractions]
            newAttractions[id][type] = e.target.value
            setAttractions(newAttractions)
            const newErr = [...err]
            newErr[id][type] = ""
            setErr(newErr)
            setSaveChange(true)
        }   
    }

    const handleChangeImage = (e, id) =>{
        if (e.target.files[0] && e.target.files[0].type.startsWith('image/') && e.target.files[0].size / 1024 <= 4 * 1024){
            const newAttraction = [...attractions]
            newAttraction[id] = {...newAttraction[id], file: e.target.files[0]}
            setAttractions(newAttraction)
            const newErr = [...err]
            newErr[id].img = ""
            setErr(newErr)
            setSaveChange(true)
        }
        else if (e.target.files[0] && !e.target.files[0].type.startsWith('image/')){
            const newErr = [...err]
            newErr[id].img = "Uploaded file must be an image file (.jpg, .png, .jpeg)"
            setErr(newErr)
            setSaveChange(false)
        }
        else if (e.target.files[0] && e.target.files[0].size / 1024 <= 4 * 1024){
            const newErr = [...err]
            newErr[id].img = "Uploaded file must not exceed 4MB"
            setErr(newErr)
            setSaveChange(false)
        }
    }

    const handleDeleteImage = (e,id) =>{
        const newAttraction = [...attractions]
        newAttraction[id] = {...newAttraction[id], photo_path: "", file: null}
        setAttractions(newAttraction) 
        const newErr = [...err]
        newErr[id].img = ""
        setErr(newErr)
        setSaveChange(true)      
    }

   
    const handleSave = () => {
        dispatch(updateGuideAttractionByIdGuide(guide_info.id_guide, attractions))
        setSaveChange(false)
        console.log(attractions)
    }
    
    if (attractions)
    return(
        <>
            <div className = "attraction-frame" key = {0}>
                <div className = "picture">
                    <img src = {loadLicense(attractions[0]?.file) || importImage(attractions[0]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer onChange = {(e) => handleChangeImage(e,0)}/>
                        <ButtonDeleteFreelancer onClick = {(e) => handleDeleteImage(e,0)}/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title1">Title</label>
                    <input type = "text" id = "title1" name = "title1" value = {attractions[0]?.title || ""} onChange = {(e) => handleChangeInfo(e,"title", 0)}></input>
                    <label htmlFor = "desc1">Content</label>
                    <textarea type = "text" id = "desc1" name = "desc1" value = {attractions[0]?.content || ""} onChange = {(e) => handleChangeInfo(e,"content", 0)} ></textarea>
                </div>
            </div>

            <ErrorInput mess = {err[0].img} hidden = {!err[0].img}/>
            <ErrorInput mess = {err[0].title} hidden = {!err[0].title}/>
            <ErrorInput mess = {err[0].content} hidden = {!err[0].content}/>

            <div className = "attraction-frame" key = {1}>
                <div className = "picture">
                    <img src = {loadLicense(attractions[1]?.file) || importImage(attractions[1]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer onChange = {(e) => handleChangeImage(e,1)}/>
                        <ButtonDeleteFreelancer onClick = {(e) => handleDeleteImage(e,1)}/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title2">Title</label>
                    <input type = "text" id = "title2" name = "title2" value = {attractions[1]?.title || ""} onChange = {(e) => handleChangeInfo(e,"title", 1)}></input>
                    <label htmlFor = "desc2">Content</label>
                    <textarea type = "text" id = "desc2" name = "desc2" value = {attractions[1]?.content || ""} onChange = {(e) => handleChangeInfo(e,"content", 1)} ></textarea>
                </div>
            </div>

            <ErrorInput mess = {err[1].img} hidden = {!err[1].img}/>
            <ErrorInput mess = {err[1].title} hidden = {!err[1].title}/>
            <ErrorInput mess = {err[1].content} hidden = {!err[1].content}/>

            <div className = "attraction-frame" key = {2}>
                <div className = "picture">
                    <img src = {loadLicense(attractions[2]?.file) || importImage(attractions[2]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer onChange = {(e) => handleChangeImage(e,2)}/>
                        <ButtonDeleteFreelancer onClick = {(e) => handleDeleteImage(e,2)}/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title3">Title</label>
                    <input type = "text" id = "title3" name = "title3" value = {attractions[2]?.title} onChange = {(e) => handleChangeInfo(e,"title", 2)}></input>
                    <label htmlFor = "desc3">Content</label>
                    <textarea type = "text" id = "desc3" name = "desc3" value = {attractions[2]?.content} onChange = {(e) => handleChangeInfo(e,"content", 2)} ></textarea>
                </div>
            </div>

            <ErrorInput mess = {err[2].img} hidden = {!err[2].img}/>
            <ErrorInput mess = {err[2].title} hidden = {!err[2].title}/>
            <ErrorInput mess = {err[2].content} hidden = {!err[2].content}/>

            <ButtonUploadFreelancer className="button-save" title = "SAVE ALL CHANGES" onClick = {handleSave} disabled = {!saveChange}/>
        </>
    )
}


        