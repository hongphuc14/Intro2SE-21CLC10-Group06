import placeholder from '../../placeholder-image.png'
import "./TourCompany.scss";
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import ErrorInput from '../../Components/Message/ErrorInput';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonViewFreelancer, ButtonUploadFreelancer} from '../../Components/Button/ButtonFreelancer'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {deleteCompanyTour, getCompanyInfo, getCompanyLicense, getCompanyTour,updateTour,
} from '../../redux/actions/CompanyAction'

const tour_default = {
    name: "",
    id_tour: 0,
    id_des: 1,
    id_category: 2,
    num_max: "",
    duration: "",
    description: "",
    included: "",
    not_included: "",
    schedule: "",
    price: "",
    free_cancellation: false,
    is_deleted: false,
}

export default function TourCompany(){ 
    const dispatch = useDispatch() 
    console.log("1")
    const { user_login, destination} = useSelector(state => state.BasicReducer)
    const { verified, company_tour, company_info} = useSelector(state => state.CompanyReducer)

    const importAvatar = (filename) => {
        if (typeof filename === 'undefined' || filename === "")
          return null
        const path = require(`../../../../../BackEnd/public/company_avatar/${filename}`)
        return path
    }

    const importPhoto= (filename) => {
        if (typeof filename === 'undefined' || filename === "" || filename === null)
          return null
        try{
            const path = require(`../../../../../BackEnd/public/tour/${filename}`)
            return path
        }
        catch(err){
            return null
        }
    }

    const loadPreview = (file) =>{
        if (file){
          return URL.createObjectURL(file);
        }
        return null
      }

    const getDes = (id) =>{
        let name = ""
        destination.forEach(des => {
            if (id === des.id_des)
                name = des.name
        })
        return name
    }
    
    useEffect(() => {
        dispatch(getCompanyInfo(user_login.email))
    },[] )

    useEffect(() => {
        if (company_info?.id_company) {
            if (JSON.stringify(company_tour) === "[]")
                dispatch(getCompanyTour(company_info.id_company))
            if (verified === null)
                dispatch(getCompanyLicense(company_info.id_company))
        }
    }, [company_info.id_company])

    const [tours, setTours] = useState([])
    const [tour_info, setTour_Info] = useState({})
    if (JSON.stringify(tour_info) === "{}"){
        setTour_Info(tour_default)
        console.log("!")
    }
        
    useEffect(() => {
        setTours(company_tour)
    },[company_tour])

    const [isAdd, setIsAdd] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isChange, setIsChange] = useState(false)

    const handleChange = (e) => {
        formik.handleChange(e)
        setIsChange(true)
    }

    const [preview, setPreview] = useState(null)
    const [errPre, setErrPre] = useState(null)
    const handlePhoto = (e) => {
        if (e.target.files[0])
            if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
            setPreview(e.target.files[0])
            // console.log(preview);
            setIsChange(true)
            setErrPre(null)
            }
            else if (!e.target.files[0].type.startsWith('image/')){
            setIsChange(false)
            setErrPre('Photo must be an image file (.jpg, .png, .jpeg)')
            }
            else if (!(e.target.files[0].size / 1024 <= 4)){
            setIsChange(false)
            setErrPre('Phot must not exceed 4MB')
            }
    }

    const viewPhoto = () => {
        window.open(loadPreview(preview) || importPhoto(tour_info?.photo_path),'_blank')
    }

    const reset = () => {
        setTour_Info({...tour_default})
        setIsChange(false)
        setIsAdd(false)
        setIsUpdate(false)
        setPreview(null)
        setErrPre(null)
    }

    const handleSave = () => {
        formik.values.id_des = parseInt(formik.values.id_des)
        formik.values.id_category = parseInt(formik.values.id_category)
        dispatch(updateTour(company_info.id_company, formik.values,preview))
        reset()
    }

    const handleDelete = (id_tour) => {
        dispatch(deleteCompanyTour(company_info.id_company,id_tour))
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: tour_info,
        onSubmit: handleSave,
        validationSchema: yup.object().shape({
          name: yup.string().max(50,"Tour name has the maximum of 50 characters").min(5,"Tour name must have at least 5 characters").required('Tour name is required'),
          num_max: yup.number().required('The maximum number of tourist is required'),
          duration: yup.number().required('Duration is required'),
          price: yup.number().required('Price is required'),
          id_des: yup.string().required('Destination is required'),
          id_category: yup.string().required('Category is required'),
          schedule: yup
          .string()
          .url("Schedule link must be a valid URL")
        }),
      })

    // console.log(tour_info)

    return (
        <div className = "tour-company">
            <HeaderCompany/>
            <NavbarCompany src = {importAvatar(company_info.avatar) || placeholder} name ={company_info?.name?.toUpperCase()} flag2 = "focus"/>
            {
                verified &&!isUpdate && !isAdd && (
                <div className = "main-managetour ver2">
                <div className = "create-tour" onClick = {() => {setIsAdd(true)}}>
                    <i className="fa-solid fa-circle-plus"></i>
                    <p>Create a tour</p>
                </div>
                {
                    tours.map(tour =>{
                        return (
                            <div key = {tour.id_tour} className = "tour">
                                <div className = "tour-hover">
                                    <ButtonEditFreelancer type = "button" onClick = {() => {setIsUpdate(true); setTour_Info({...tour})}}/>
                                    <ButtonDeleteFreelancer onClick = {() => {handleDelete(tour.id_tour)}}/>
                                    <ButtonViewFreelancer/>
                                </div>
                                <img src = {importPhoto(tour?.photo_path) || placeholder}></img>
                                <p className = "name">{tour.name}</p>
                                <p className = "des">{getDes(tour.id_des)}</p>
                                <p className = "price">{tour.price.toFixed(2)}$</p>
                                <p className = "duration">{tour.duration} days</p>
                                <p className = "num-tourist">{tour.num_max} tourists</p>
                            </div>
                        )
                    })
                }
                </div>
            )}
            {
                verified && (isAdd || isUpdate) && (
                    <div className = "tour-form">
                        <form className = "form" onSubmit = {formik.handleSubmit}>
                            <div className = "left-form">
                                <div className = "input-field">
                                    <label htmlFor = "name">
                                        Tour name 
                                        <p> *</p> 
                                    </label>
                                    <input id = "name" name = "name" value = {formik?.values?.name || ''} onChange = {(e) => {handleChange(e)}} type = "text"></input>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "num_max">
                                        The maximum number of tourist 
                                        <p> *</p> 
                                    </label>
                                    <input id = "num_max" name = "num_max" type = "number" value = {formik?.values?.num_max || ''} onChange = {(e) => {handleChange(e)}} ></input>
                                </div>
                                <div className = "check-box">
                                    <legend> Category <p> * </p> </legend>
                                    <input id = "beach" type = "radio" name = "id_category" value = {2} checked ={parseInt(formik.values.id_category) === 2 || false} onChange = {(e)=>handleChange(e)} ></input>
                                    <label htmlFor="beach">Beach</label>
                                    <input id = "highland" type = "radio" name = "id_category" value = {4}  checked ={parseInt(formik.values.id_category) === 4 || false} onChange = {(e)=>handleChange(e)}></input>
                                    <label htmlFor="highland">Highland</label>
                                    <input id = "culture" type = "radio" name = "id_category" value = {3}  checked ={parseInt(formik.values.id_category) === 3 || false} onChange = {(e)=>handleChange(e)}></input>
                                    <label htmlFor="culture">Culture</label>
                                    <input id = "adventure" type = "radio" name = "id_category" value = {1}  checked ={parseInt(formik.values.id_category) === 1 || false} onChange = {(e)=>handleChange(e)}></input>
                                    <label htmlFor="adventure">Adventure</label>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "included">What's included</label>
                                    <input id = "included" name="included" value = {formik?.values?.included || ''} onChange = {(e) => {handleChange(e)}}></input>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "not_included">What's not included</label>
                                    <input id = "not_included" name="not_included" value = {formik?.values?.not_included || ''} onChange = {(e) => {handleChange(e)}}></input>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "schedule_link">Schedule link</label>
                                    <input id = "schedule_link" name="schedule" value = {formik?.values?.schedule || ''} onChange = {(e) => {handleChange(e)}}></input>
                                </div>
                                <div className = "input-field">
                                    <label>Photo</label>
                                    <input type="file" id = "license" name = "license" accept="image/*" onChange = {(e) => {handlePhoto(e)}}/>
                                    <ButtonUploadFreelancer className="button-upload" title = "VIEW A PHOTO" onClick = {viewPhoto} />
                                </div>
                                
                            </div>
                            <div className = "right-form">
                                <div className = "input-field">
                                    <label htmlFor="des">
                                        Destination
                                        <p> * </p>
                                    </label>
                                    <select id="des" name="id_des" value={formik?.values?.id_des?.toString() || 1} onChange={(e)=>handleChange(e)}>
                                    {
                                        destination.map((des)=> <option key = {des.id_des} name ={des.id_des} value = {des.id_des} > {des.name} </option>)
                                    }
                                    </select>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "duration">
                                        Duration
                                        <p> *</p> 
                                    </label>
                                    <input id = "duration" name = "duration" type = "number"  value = {formik?.values?.duration || ''} onChange = {(e) => {handleChange(e)}}></input>
                                </div>
                                <div className = "input-field">
                                    <label htmlFor = "price">
                                        Price
                                        <p> *</p> 
                                    </label>
                                    <input id = "price" name = "price" type = "number"  value = {formik?.values?.price || ''} onChange = {(e) => {handleChange(e)}}></input>
                                </div>
                                <div className = "input-field type2">
                                    <label htmlFor="desc">
                                        Description
                                    </label>
                                    <textarea id = "desc" name = "description" type = "text"  value = {formik?.values?.description || ''} onChange = {(e) => {handleChange(e)}} ></textarea>
                                </div>
                                <div className = "check-box">
                                    <input id = "free_cancellation" type = "checkbox" name = "free_cancellation" value ={true} checked ={formik.values.free_cancellation} onChange = {(e)=>handleChange(e)}></input>
                                    <label htmlFor="free_cancellation">Free cancellation within 24 hours of booking</label>
                                </div>
                            </div>
                            <div className = "error">
                                <ErrorInput mess = {formik.errors.name} hidden = {!formik.errors.name}/>
                                <ErrorInput mess = {formik.errors.num_max} hidden = {!formik.errors.num_max}/>
                                <ErrorInput mess = {formik.errors.duration} hidden = {!formik.errors.duration}/>
                                <ErrorInput mess = {formik.errors.price} hidden = {!formik.errors.price}/>
                                <ErrorInput mess = {formik.errors.id_des} hidden = {!formik.errors.id_des}/>
                                <ErrorInput mess = {formik.errors.id_category} hidden = {!formik.errors.id_category}/>
                                <ErrorInput mess = {formik.errors.schedule} hidden = {!formik.errors.schedule}/>
                                <ErrorInput mess = {errPre} hidden = {!errPre}/>
                            </div>
                            <ButtonUploadFreelancer className="button-upload" title = "BACK" onClick = {reset} />
                            {
                                isAdd && (
                                    <ButtonUploadFreelancer type = "submit" className="button-save" title = "ADD TOUR" disabled = {!isChange} />
                                )
                            }
                            {
                                isUpdate && (
                                    <ButtonUploadFreelancer type = "submit"  className="button-save" title = "SAVE CHANGE" disabled = {!isChange}/>
                                )
                            }
                        </form>
                    
                    </div>
                )
            }
            
            {
                !verified && (
                <div className = "main-managetour">
                    <p className = "welcome">Welcome to Manage Tour</p>
                    <p>You have to upload legitimate tourism licenses to unlock this section</p>
                </div>
            )} 
        </div>
    )
}