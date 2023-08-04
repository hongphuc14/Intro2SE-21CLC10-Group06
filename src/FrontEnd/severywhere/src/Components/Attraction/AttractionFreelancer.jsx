import './AttractionFreelancer.scss';
import placeholder from '../../placeholder-image.png';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../Button/ButtonFreelancer"
import { useState, useEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import {updateGuideAttractionByIdGuide} from '../../redux/actions/FreelancerAction'

export default function AttractionFreelancer({list}){
    const [attractions, setAttractions] = useState([])
    // const [attractionFrame, setAttractionFrame] = useState(new Array(attractions.length).fill(false))

    useEffect(() =>{
        setAttractions([...list])
    }, [list])

    const importImage = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
            return null
        const path = require(`../../../public/freelancer_avatar/${filename}`)
        return path
      }
    
    // const [preview, setPreview] = useState( importAvatar(guide_info.avatar) || placeholder)
    // const handleChangeAvatar = (e) => {
    // if (e.target.files[0]){
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onloadend = () => {
    //     setPreview(reader.result);
    //     };
    //     // console.log(preview);
    //     const newAva = e.target.files[0].name
    //     const newEvent = { ...e, target: {name: "avatar", value: newAva}};
    //     formik.handleChange(newEvent);
    //     setSaveChanges(true)
    // }
    //   }

    const handleChange = (e, type, id) => {
        // const newAttractions = [...attractions]
        // console.log(newAttractions[id-1])
        // newAttractions[id-1][type] = e.target.value
        // setAttractions(newAttractions)
    }

    // console.log(attractions)

    const formik1 = useFormik({
        enableReinitialize: true,
        // initialValues: {...attractions[0]},
        // validationSchema: yup.object().shape({
        //     title: yup.string().max(50,"Full name has the maximum of 50 characters").min(5,"Full name must have at least 5 characters"),
        //     description: yup.string().max(200, 'Description has the maximum of 200 characters'),
        //     photo_path: yup.mixed().test('fileType', 'Invalid file type', value => {
        //         return value && value.type.includes('image');
        //       }),
        // }),      
    })

    if (attractions)
    return(
        // <>
        // {attractions?.map((attr) =>{
        //     return(
        //         <div className = "attraction-frame" key = {attr.id_attraction}>
        //             <div className = "picture">
        //                 <img src = {importImage(attr.photo_path) || placeholder} alt = {attr.photo_path}/>
        //                 <div className = "picture-bg">
        //                     <ButtonEditFreelancer/>
        //                     <ButtonDeleteFreelancer/>
        //                 </div>
        //             </div>
        //             <div className = "attraction">
        //                 <label htmlFor = {`title${attr.id_attraction}`}>Title</label>
        //                 <input type = "text" id = {`title${attr.id_attraction}`} name = {`title${attr.id_attraction}`} value = {attr.title} onChange = {(e) => handleChange(e,"title", attr.id_attraction)}></input>
        //                 <label htmlFor = {`desc${attr.id_attraction}`}>Description</label>
        //                 <textarea type = "text" id = {`desc${attr.id_attraction}`} name = {`desc${attr.id_attraction}`} value = {attr.description} onChange = {(e) => handleChange(e,"description", attr.id_attraction)} ></textarea>
        //             </div>
        //             <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSave}/>
        //             {/* <ButtonUploadFreelancer className="button-upload" title = "DELETE" /> */}
        //         </div>
        //     )
        // }) 
        // }
        // </>
        <>
            <div className = "attraction-frame" key = {1}>
                <div className = "picture">
                    <img src = {importImage(attractions[0]?.photo_path) || placeholder} alt = "attraction"/>
                    <div className = "picture-bg">
                        <ButtonEditFreelancer/>
                        <ButtonDeleteFreelancer/>
                    </div>
                </div>
                <div className = "attraction">
                    <label htmlFor = "title1">Title</label>
                    <input type = "text" id = "title1" name = "title1" value = {attractions[0]?.title} onChange = {(e) => handleChange(e,"title", 0)}></input>
                    <label htmlFor = "desc1">Description</label>
                    <textarea type = "text" id = "desc1" name = "desc1" value = {attractions[0]?.description} onChange = {(e) => handleChange(e,"description", 0)} ></textarea>
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
                    <input type = "text" id = "title2" name = "title2" value = {attractions[1]?.title} onChange = {(e) => handleChange(e,"title", 1)}></input>
                    <label htmlFor = "desc2">Description</label>
                    <textarea type = "text" id = "desc2" name = "desc2" value = {attractions[1]?.description} onChange = {(e) => handleChange(e,"description", 1)} ></textarea>
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
                    <input type = "text" id = "title3" name = "title3" value = {attractions[2]?.title} onChange = {(e) => handleChange(e,"title", 2)}></input>
                    <label htmlFor = "desc3">Description</label>
                    <textarea type = "text" id = "desc3" name = "desc3" value = {attractions[2]?.description} onChange = {(e) => handleChange(e,"description", 2)} ></textarea>
                </div>
                {/* <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {handleSave}/> */}
            </div>
        </>
    )
}


        