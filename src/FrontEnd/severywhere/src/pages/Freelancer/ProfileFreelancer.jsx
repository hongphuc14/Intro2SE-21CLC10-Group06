import './ProfileFreelancer.scss'
import placeholder from '../../placeholder-image.png'
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ErrorInput from '../../Components/Message/ErrorInput'
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../../Components/Button/ButtonFreelancer"
import AttractionFreelancer from '../../Components/Attraction/AttractionFreelancer';
import { useSelector, useDispatch } from "react-redux";
import {Link, useLocation} from "react-router-dom"
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
// import im from '../../../public/image'

import {getDestination} from '../../redux/actions/BasicAction'
import { getGuideLanguageByIdGuide, getGuideLicenseByIdGuide, getGuideAttractionByIdGuide,
  updateGuideInfo, updateGuideLanguage, updateGuideLicense, updateGuideAvatar, 
  updateGuidePassword, updateUploadedLicense } from '../../redux/actions/FreelancerAction';

export default function ProfileFreelancer(){
  const dispatch = useDispatch()
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);

  const {destination} = useSelector(state => state.BasicReducer)
  const {guide_language_by_id_guide, verified, guide_license_by_id_guide, guide_info, guide_attraction_by_id_guide} = useSelector(state => state.FreelancerReducer)
  // console.log(user_login)

  // login mới get để lưu vào state
  useEffect(() => {
    // console.log(guide_info)
    dispatch(getGuideLanguageByIdGuide(guide_info.id_guide))
    dispatch(getGuideLicenseByIdGuide(guide_info.id_guide))
    dispatch(getGuideAttractionByIdGuide(guide_info.id_guide))
  },[] )

  const handleChangeInfo = (e)=> {
    formik.handleChange(e);
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

  let {license, isDelete} = location.state ? location.state : {}
  if (!license)
    license = guide_license_by_id_guide

  const [uploadedLicense, setUploadedLicense] = useState([])
  const handleUploadLicense = (e) => {
    const tmp = [...uploadedLicense, {file_path: e.target.files[0].name, status: 1, file: e.target.files[0]}]
    setSaveChanges(true)
    setUploadedLicense (tmp)
    // console.log(license)
  }

  // console.log(uploadedLicense)

  const importAvatar = (filename) => {
    if (typeof filename === 'undefined' || filename === "")
      return null
    const path = require(`../../../public/freelancer_avatar/${filename}`)
    return path
  }
  
  const [preview, setPreview] = useState( importAvatar(guide_info.avatar) || placeholder)
  const [errorAva, setErrorAva] = useState(null)
  const handleChangeAvatar = (e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith('image/')){
      console.log(1)
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      // console.log(preview);
      const newAva = e.target.files[0].name
      const newEvent = { ...e, target: {name: "avatar", value: newAva}};
      formik.handleChange(newEvent);
      setSaveChanges(true)
      setErrorAva(null)
    }
    else if (e.target.files[0] && !e.target.files[0].type.startsWith('image/'))
      setErrorAva('Avatar has invalid file type')
  }

  const [saveChanges, setSaveChanges] = useState(isDelete || license.length > guide_license_by_id_guide.length || false )
  const handleSaveChanges = () => {
    formik.values.gender = parseInt(formik.values.gender)
    formik.values.id_des = parseInt(formik.values.id_des)
    const {language, ...newInfo} = formik.values
    
    dispatch(updateGuideInfo(newInfo.id_guide, newInfo))
    dispatch(updateGuideLanguage(newInfo.id_guide, language))
    dispatch(updateGuideLicense(newInfo.id_guide, license))
    dispatch(updateGuideAvatar(newInfo.id_guide, preview))
    setSaveChanges(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {...guide_info,language: guide_language_by_id_guide},
    onSubmit: handleSaveChanges,
    validationSchema: yup.object().shape({
      fullname: yup.string().max(50,"Full name has the maximum of 50 characters").min(5,"Full name must have at least 5 characters").required('Full name is required'),
      birthday: yup.string().required('Birthday is required'),
      gender: yup.number().required('Gender is required'),
      phone: yup.string().test('len', 'Phone number must have exactly 10 digits', val => val && val.toString().length === 10).required('Phone number is required'),
      id_des: yup.string().required('Destination is required'),
      language: yup.number().required('Language is required'),
      experience: yup.string().required('Experience is required'),
      // avatar: yup.string().test('fileType', 'Avatar has invalid file type', value => {return /\.(jpg|jpeg|png)$/i.test(value)}),
      description: yup.string().required('Description is required').max(200, 'Description has the maximum of 200 characters')
    }),
  })
  
  const [changePassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const savePassword = (e) => {
    if (newPassword){
      formik.values.password = newPassword
      const {language, ...newInfo} = formik.values
      dispatch(updateGuidePassword(newInfo.id_guide, newInfo))
      setChangePassword(false)
    }
  }

  console.log(formik.errors)
  // console.log(user_login)

  return(
    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer src = {preview ? preview : placeholder} fullname = {guide_info?.fullname?.toUpperCase()} flag1 = "focus"/>
      <div className = "main-profile">
        <form className = "update-profile" onSubmit = {formik.handleSubmit}>
          <div className = "form-profile">
            <div className = "input-field">
                <label htmlFor="fullname">
                    Full name
                    <p> * </p>
                </label>
                <input id = "fullname" name ="fullname" type = "text" value = {formik.values.fullname || ''} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)} required/>
            </div>
            <ErrorInput mess = {formik.errors.fullname} hidden = {!formik.errors.fullname}/>
            <div className = "input-field">
                <label htmlFor="birthday">
                    Date of birth <p> * </p>
                </label>
                <input id = "birthday" name = "birthday" type = "date" defaultValue = {formik.values.birthday || ''} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)}  required />
            </div>
            <ErrorInput mess = {formik.errors.birthday} hidden = {!formik.errors.birthday}/>
            <div className = "check-box">
              <legend> Gender <p> * </p> </legend>
              <input id = "male" type = "radio" name = "gender" value = {0} checked ={parseInt(formik.values.gender) === 0 || false} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)}></input>
              <label htmlFor="male">Male</label>
              <input id = "female" type = "radio" name = "gender" value = {1} checked ={parseInt(formik.values.gender) === 1 || false} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)}></input>
              <label htmlFor="female">Female</label>
            </div>
            <ErrorInput mess = {formik.errors.gender} hidden = {!formik.errors.gender}/>
            <div className = "input-field">
                <label htmlFor="des">
                    Destination
                    <p> * </p>
                </label>
                <select id="des" name="id_des" defaultValue={formik.values.id_des || ''} onChange={(e)=>handleChangeInfo(e,formik.handleChange)}>
                  {
                    destination.map((des)=> <option key = {des.id_des} name ={des.id_des} value = {des.id_des} > {des.name} </option>)
                  }
                </select>
            </div>
            <ErrorInput mess = {formik.errors.id_des} hidden = {!formik.errors.id_des}/>
            <div className = "input-field">
                <label htmlFor="phone">
                    Phone number
                    <p> * </p>
                </label>
                <input id = "phone" name = "phone" type = "tel" value = {formik.values.phone || ''} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>
            <ErrorInput mess = {formik.errors.phone} hidden = {!formik.errors.phone}/>
            <div className = "check-box">
              <legend> Language <p> * </p> </legend>
                <input id = "VN" type = "checkbox" name = "language" value = {1} checked ={formik.values.language.includes(1) || false} onChange = {(e)=>handleChangeLanguage(e,formik.handleChange)}></input>
                <label htmlFor="VN">Vietnamese</label>
                <input id = "EN" type = "checkbox" name = "language" value = {2} checked ={formik.values.language.includes(2) || false} onChange = {(e)=>handleChangeLanguage(e,formik.handleChange)}></input>
                <label htmlFor="EN">English</label>
            </div>
            <ErrorInput mess = {formik.errors.language} hidden = {!formik.errors.language}/>
            <div className = "input-field">
                <label htmlFor="exp">
                    Experience (years)
                    <p> * </p>
                </label>
                <input id = "exp" name = "experience" type = "text" value = {formik.values.experience || ''} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>
            <ErrorInput mess = {formik.errors.experience} hidden = {!formik.errors.experience}/>
            <div className = "input-field type2">
                <label htmlFor="desc">
                    Description
                    <p> * </p>
                </label>
                <textarea id = "desc" name = "description" type = "text" value = {formik.values.description || ''} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} ></textarea>
            </div>
            <ErrorInput mess = {formik.errors.description} hidden = {!formik.errors.description}/>
            <div className = "input-field last">
              <legend>Tourism licenses</legend>
              <input type="file" id = "license" name = "license" accept="image/*" onChange = {(e) => {handleUploadLicense(e)}}/>
              <Link to = {{pathname: "/license-freelancer", state: {license: [...license,...uploadedLicense]}}}>
                <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES" name = "view-license" />
              </Link>
            </div>
            {/* <ErrorInput mess = {errorLicense} hidden = {!errorLicense}/> */}
            <ErrorInput mess = {errorAva} hidden = {!errorAva}/>
          </div>

          <div className = "avatar-frame">
            <div className = "picture">
                <img src={preview ? preview : placeholder} alt = ""></img>
                <div className = "picture-bg">
                  <ButtonEditFreelancer name = "avatar" onChange = {(e) => {handleChangeAvatar(e)}}/>
                  <ButtonDeleteFreelancer onClick = {() => {if (preview) setSaveChanges(true); setPreview(null)}}/>
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
          <AttractionFreelancer list = {guide_attraction_by_id_guide}/>
          <ButtonUploadFreelancer className="button-save" title = "SAVE ALL CHANGES"/>
        </div>

        <div className = "hr"></div>

        <div className = "setting">
          <div className = "info">
            <div className = "input-field">
                <label htmlFor="email">
                    Email address
                    <p> * </p>
                </label>
                <input id = "email" name = "email" type = "email" value = {formik.values.email || ''} disabled/>
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
                <input id = "cur-pwd" name = "cur-pwd" type = "password" minLength={8}/>
            </div>
            <div className = "input-field">
                <label htmlFor="new-pwd">
                    New password
                    <p> * </p>
                </label>
                <input id = "new-pwd" name = "new-pwd" type = "password"  onChange = {(e) => {if (e.target.value.length >= 8) setNewPassword(e.target.value)}} />
            </div>
            <div className = "input-field">
                <label htmlFor="confirm-pwd">
                    Confirm password
                    <p> * </p>
                </label>
                <input id = "confirm-pwd" name = "confirm-pwd" type = "password"/>
            </div>
            <ButtonUploadFreelancer className="button-save" name = "password" title = "SAVE" onClick = {(e) => {savePassword(e)}}/>
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
