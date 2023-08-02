import './ProfileFreelancer.scss'
import placeholder from '../../placeholder-image.png'
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../../Components/Button/ButtonFreelancer"
import AttractionFreelancer from '../../Components/Attraction/AttractionFreelancer';
import { useSelector, useDispatch } from "react-redux";
import {Link, useLocation} from "react-router-dom"
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'

import { getTourGuideByIdGuide, getGuideLanguageByIdGuide, getGuideLicenseByIdGuide,getGuideAttractionByIdGuide,
        updateTourGuideByIdGuide } from '../../redux/actions/FreelancerAction';

export default function ProfileFreelancer(){
  const dispatch = useDispatch()
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);
  // login mới get để lưu vào state
  // useEffect(()=> dispatch(getTourGuideByIdGuide("tunglamtran.work@gmail.com")), [] )

  const {destination} = useSelector(state => state.BasicReducer)
  const {tour_guide_by_id_guide, guide_language_by_id_guide, verified, guide_license_by_id_guide} = useSelector(state => state.FreelancerReducer)
  let {license, isDelete} = location.state ? location.state : {}
  if (!license)
    license = guide_license_by_id_guide

  const handleChangeInfo = (e)=> {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    const newEvent = { ...e, target: { name, value: trimmedValue } };
    formik.handleChange(newEvent);
    setSaveChanges(true)
  }

  const handleChangeLanguage = (e) => {
    let tmp = [...formik.values.language]
    const val = parseInt(e.target.value)
    if (tmp.includes(val))
      tmp = tmp.filter(lang => lang !== val)
    else
      tmp.push(val)

    const newEvent = { ...e, target: { name: "language", value: tmp} };
    formik.handleChange(newEvent);
    setSaveChanges(true)
  }

  const [uploadedLicense, setUploadedLicense] = useState(license)
  const handleAddLicense = (e) => {
    const newAva = e.target.files[0].name
    const newEvent = { ...e, target: {name: "avatar", value: newAva}};
    formik.handleChange(newEvent);
    setSaveChanges(true)  
  }


  const [preview, setPreview] = useState(null)
  const handleChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    console.log( e.target.files[0])
    const newAva = e.target.files[0].name
    const newEvent = { ...e, target: {name: "avatar", value: newAva}};
    formik.handleChange(newEvent);
    setSaveChanges(true)
  }

  const formik = useFormik({
    initialValues: {...tour_guide_by_id_guide,language: guide_language_by_id_guide},
    onSubmit: (values) =>{
      console.log("-", values)
    },
    validationSchema: yup.object().shape({
      fullname: yup.string().min(8,"oke").required('Name is required')
    })
  })

  const [saveChanges, setSaveChanges] = useState(isDelete ? isDelete : false)
  const handleSaveChanges = (e) => {
    e.preventDefault()
    formik.values.gender = parseInt(formik.values.gender)
    formik.values.id_des = parseInt(formik.values.id_des)
    const {language, ...newInfo} = formik.values
    // update filename
    dispatch(updateTourGuideByIdGuide(newInfo.id_guide, newInfo, language, license))
    // update avatar -> File object
    // dispatch(uploadAvatar())
    // update license -> File object
    setSaveChanges(false)
  }

  const [changePassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const savePassword = (e) => {
    const {language, ...newInfo} = formik.values
    newInfo.password = newPassword
    dispatch(updateTourGuideByIdGuide(newInfo.id_guide, newInfo, language, license))
    setChangePassword(false)
  }

  // console.log(formik.errors)
  // console.log(formik.values)
  // console.log(license)

  return(
    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer src = {preview ? preview : placeholder} fullname = {tour_guide_by_id_guide.fullname.toUpperCase()} flag1 = "focus"/>
      <div className = "main-profile">
        <form className = "update-profile" onSubmit = {(e) => {handleSaveChanges(e)}}>
          <div className = "form-profile">
            <div className = "input-field">
                <label htmlFor="fullname">
                    Full name
                    <p> * </p>
                </label>
                <input id = "fullname" name ="fullname" type = "text" value = {formik.values.fullname} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)} required/>
            </div>

            <div className = "input-field">
                <label htmlFor="birthday">
                    Date of birth <p> * </p>
                </label>
                <input id = "birthday" name = "birthday" type = "date" defaultValue = {formik.values.birthday} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)}  required />
            </div>

            <div className = "check-box">
              <legend> Gender <p> * </p> </legend>
              <input id = "male" type = "radio" name = "gender" value = {0} defaultChecked ={formik.values.gender === 0} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)}></input>
              <label htmlFor="male">Male</label>
              <input id = "female" type = "radio" name = "gender" value = {1} defaultChecked ={formik.values.gender === 1} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)}></input>
              <label htmlFor="female">Female</label>
            </div>

            <div className = "input-field">
                <label htmlFor="des">
                    Destination
                    <p> * </p>
                </label>
                <select id="des" name="id_des" defaultValue={formik.values.id_des} onChange={(e)=>handleChangeInfo(e,formik.handleChange)}>
                  {
                    destination.map((des)=> <option key = {des.id_des} name ={des.id_des} value = {des.id_des} > {des.name} </option>)
                  }
                </select>
            </div>

            <div className = "input-field">
                <label htmlFor="phone">
                    Phone number
                    <p> * </p>
                </label>
                <input id = "phone" name = "phone" type = "tel" value = {formik.values.phone} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>

            <div className = "check-box">
              <legend> Language <p> * </p> </legend>
                <input id = "VN" type = "checkbox" name = "language" value = {1} defaultChecked ={formik.values.language.includes(1)} onChange = {(e)=>handleChangeLanguage(e,formik.handleChange)}></input>
                <label htmlFor="VN">Vietnamese</label>
                <input id = "EN" type = "checkbox" name = "language" value = {2} defaultChecked ={formik.values.language.includes(2)} onChange = {(e)=>handleChangeLanguage(e,formik.handleChange)}></input>
                <label htmlFor="EN">English</label>
            </div>

            <div className = "input-field">
                <label htmlFor="exp">
                    Experience (years)
                    <p> * </p>
                </label>
                <input id = "exp" name = "experience" type = "text" value = {formik.values.experience} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>

            <div className = "input-field type2">
                <label htmlFor="desc">
                    Description
                    <p> * </p>
                </label>
                <textarea id = "desc" name = "description" type = "text" value = {formik.values.description} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} ></textarea>
            </div>

            <div className = "input-field">
              <legend>Tourism licenses</legend>
              <input type="file" id = "license" name = "license" accept="image/*"/>
              <Link to = "/license-freelancer">
                <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES" name = "upload-license" onChange = {(e) => {handleAddLicense(e)}}/>
              </Link>
            </div>
          </div>

          <div className = "avatar-frame">
            <div className = "picture">
                <img src={preview ? preview : placeholder} alt = ""></img>
                <div className = "picture-bg">
                  <ButtonEditFreelancer name = "edit-avatar" onChange = {(e) => {handleChangeAvatar(e)}}/>
                  <ButtonDeleteFreelancer/>
                </div>
            </div>
            
            {verified && 
            <div className = "verified">
                <i className="fas fa-user-check"></i>
                Verified user account
            </div>}
          </div>
          <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" type = "submit" disabled = {!saveChanges}/>
        </form>
        
        <div className = "hr"></div>

        <div className = "show-attraction">
          <p>Must-see attractions</p>
          <AttractionFreelancer/>
          <ButtonUploadFreelancer className="button-upload" title = "ADD A NEW ATTRACTION"/>
        </div>

        <div className = "hr"></div>

        <div className = "setting">
          <div className = "info">
            <div className = "input-field">
                <label htmlFor="email">
                    Email address
                    <p> * </p>
                </label>
                <input id = "email" name = "email" type = "email" value = {formik.values.email} disabled/>
            </div>
            <div className = "input-field">
                <label htmlFor="pwd">
                    Password
                    <p> * </p>
                </label>
                <input id = "pwd" name = "pwd" type = "password" value = "********" disabled/>
            </div>
            {!changePassword &&
            (<ButtonUploadFreelancer className="button-upload" title = "CHANGE PASSWORD" onClick = {()=>{setChangePassword(true)}}/>)}
          </div>
          {changePassword &&
          <div className = "change-pass">
            <div className = "input-field">
                <label htmlFor="cur-pwd">
                    Current password
                    <p> * </p>
                </label>
                <input id = "cur-pwd" name = "cur-pwd" type = "password"/>
            </div>
            <div className = "input-field">
                <label htmlFor="new-pwd">
                    New password
                    <p> * </p>
                </label>
                <input id = "new-pwd" name = "new-pwd" type = "password"  onChange = {(e) => {setNewPassword(e.target.value)}} />
            </div>
            <div className = "input-field">
                <label htmlFor="confirm-pwd">
                    Confirm password
                    <p> * </p>
                </label>
                <input id = "confirm-pwd" name = "confirm-pwd" type = "password"/>
            </div>
            <ButtonUploadFreelancer className="button-save" title = "SAVE" onClick = {(savePassword)}/>
            <ButtonUploadFreelancer className="button-upload" title = "BACK" onClick = {()=>{setChangePassword(false)}}/>
          </div>
          }
              
        </div>

        <div className = "hr"></div>      

        <a href = "https://www.google.com/" className = "delete-acc">Delete account</a>
        <a href = "https://www.google.com/" className = "log-out">Log out</a>        
      </div>
  </div>
  );
}
