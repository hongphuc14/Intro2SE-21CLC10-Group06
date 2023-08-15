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
// import image from '../../../../../BackEnd/public/freelancer_avatar'

import { getTourGuideByIdGuide, getGuideLanguageByIdGuide, getGuideLicenseByIdGuide,
  updateGuideInfo, updateGuideLanguage, updateGuideLicense, updateGuideAvatar, 
  updateGuidePassword } from '../../redux/actions/FreelancerAction';
import {getDestination} from '../../redux/actions/BasicAction'

export default function ProfileFreelancer(){
  const dispatch = useDispatch()
  const location = useLocation()
  // window.history.replaceState(null, null, location.pathname);

  const {destination, user_login} = useSelector(state => state.BasicReducer)
  const {guide_language_by_id_guide, verified, guide_license_by_id_guide, guide_info} = useSelector(state => state.FreelancerReducer)
  // console.log(user_login)

  // login mới get để lưu vào state
  useEffect(() => {
    dispatch(getTourGuideByIdGuide(user_login.email))
    dispatch(getDestination())
  },[guide_info?.id_guide] )

  useEffect(() => {
    
    if (guide_info?.id_guide) {
      dispatch(getGuideLanguageByIdGuide(guide_info.id_guide))
      dispatch(getGuideLicenseByIdGuide(guide_info.id_guide))
    }
    
  }, [guide_info.id_guide])

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

  let {license, isDelete, info, isChange, pre} = location.state ? location.state : {}
  if (!license)
    license = guide_license_by_id_guide

  const [errorLicense, setErrorLicense] = useState(null)
  const [uploadedLicense, setUploadedLicense] = useState([])
  const handleUploadLicense = (e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith('image/')){
      const tmp = [...uploadedLicense, {file_path: e.target.files[0].name, status: 1, file: e.target.files[0]}]
      setSaveChanges(true)
      setUploadedLicense (tmp)
      setErrorLicense(null)
    }
    else if (e.target.files[0] && !e.target.files[0].type.startsWith('image/'))
      setErrorLicense('License must be an image file (.jpg, .png, .jpeg)')
    else if (e.target.files[0] && !(e.target.files[0].size / 1024 <= 4 * 1024))
      setErrorLicense('License must not exceed 4MB')
  }
  // console.log(uploadedLicense)
  // console.log('-', license)

  const importAvatar =  (filename) =>  {
    if (typeof filename === 'undefined' || filename === "")
      return null
    // filename = "tourist_2.jpg"
    try{
      const path =  require(`../../../../../BackEnd/public/freelancer_avatar/${filename}`)
      return path
    }
    catch(err){
      return null
    }
  }
  
  const loadLicense = (file) =>{
    if (file && file !== "delete"){
      return URL.createObjectURL(file);
    }
    return null
  }

  const [preview, setPreview] = useState( pre || null)
  // console.log(pre)
  const [errorAva, setErrorAva] = useState(null)
  const handleChangeAvatar = (e) => {
    if (e.target.files[0])
      if (e.target.files[0].type.startsWith('image/') &&  e.target.files[0].size / 1024 <= 4*1024){
        setPreview(e.target.files[0])
        // console.log(preview);
        const newAva = e.target.files[0].name
        const newEvent = { ...e, target: {name: "avatar", value: newAva}};
        formik.handleChange(newEvent);
        setSaveChanges(true)
        setErrorAva(null)
      }
      else if (!e.target.files[0].type.startsWith('image/')){
        setSaveChanges(false)
        setErrorAva('Avatar must be an image file (.jpg, .png, .jpeg)')
      }
      else if (!(e.target.files[0].size / 1024 <= 4)){
        setSaveChanges(false)
        setErrorAva('Avatar must not exceed 4MB')
      }
  }

  const handleDeleteAvatar = (e) => {
    const newEvent = { ...e, target: {name: "avatar", value: ""}};
    formik.handleChange(newEvent);
    setPreview("delete")
    setSaveChanges(true)
    setErrorAva(null) 
  }

  const [saveChanges, setSaveChanges] = useState(isChange || isDelete || license.length > guide_license_by_id_guide.length || false )
  const handleSaveChanges = () => {
    formik.values.gender = parseInt(formik.values.gender)
    formik.values.id_des = parseInt(formik.values.id_des)
    const {language, ...newInfo} = formik.values
    
    if (preview)
      dispatch(updateGuideAvatar(newInfo.id_guide, preview))
    dispatch(updateGuideInfo(newInfo.id_guide, newInfo))
    dispatch(updateGuideLanguage(newInfo.id_guide, language))
    dispatch(updateGuideLicense(newInfo.id_guide, [...license, ...uploadedLicense]))
    
    setSaveChanges(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: info || {...guide_info,language: guide_language_by_id_guide},
    onSubmit: handleSaveChanges,
    validationSchema: yup.object().shape({
      fullname: yup.string().max(50,"Full name has the maximum of 50 characters").min(5,"Full name must have at least 5 characters").required('Full name is required'),
      birthday: yup.string().required('Birthday is required'),
      gender: yup.number().required('Gender is required'),
      phone: yup.string().test('len', 'Phone number must have exactly 10 digits', val => val && val.toString().length === 10).required('Phone number is required'),
      id_des: yup.string().required('Destination is required'),
      language: yup.array().min(1, 'Language is required').required('Language is required'),
      experience: yup.string().required('Experience is required'),
      description: yup.string().required('Description is required').max(200, 'Description has the maximum of 200 characters')
    }),
  })
  
  const [changePassword, setChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const savePassword = () => {
    dispatch(updateGuidePassword(guide_info.id_guide, currentPassword, newPassword))
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return(
    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer src = {importAvatar(guide_info.avatar) || placeholder} fullname = {guide_info?.fullname?.toUpperCase()} flag1 = "focus"/>
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
                <select id="des" name="id_des" value={formik?.values?.id_des?.toString()} onChange={(e)=>handleChangeInfo(e,formik.handleChange)}>
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
              <Link to = {{pathname: "/license-freelancer", 
                    state: {license: [...license,...uploadedLicense], info: formik.values, isChange: saveChanges, pre: preview}}}>
                <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES" name = "view-license" />
              </Link>
            </div>
            <ErrorInput mess = {errorLicense} hidden = {!errorLicense}/>
            <ErrorInput mess = {errorAva} hidden = {!errorAva}/>
          </div>

          <div className = "avatar-frame">
            <div className = "picture">
                <img src={loadLicense(preview) || importAvatar(formik.values.avatar) || placeholder} alt = ""></img>
                <div className = "picture-bg">
                  <ButtonEditFreelancer name = "avatar" onChange = {(e) => {handleChangeAvatar(e)}}/>
                  <ButtonDeleteFreelancer onClick = {(e) => {handleDeleteAvatar(e)}}/>
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
          <p>Introduce must-see attractions</p>
          <p>If the image, title, and description fields are left empty,</p>
          <p> they will be hidden in the tourist's profile view.</p>
          <AttractionFreelancer id_guide = {guide_info.id_guide} />
          {/* <ButtonUploadFreelancer className="button-save" title = "SAVE ALL CHANGES"/> */}
        </div>

        <div className = "hr"></div>

        <div className = "setting">
          <div className = "info">
            <div className = "input-field">
                <label htmlFor="email-setting">
                    Email address
                    <p> * </p>
                </label>
                <input id = "email-setting" name = "email" type = "email" value = {formik.values.email || ''} disabled/>
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
                <input id = "cur-pwd" name = "cur-pwd" type = "password" value = {currentPassword} onChange = {(e) => {setCurrentPassword(e.target.value)}}/>
            </div>
            <div className = "input-field">
                <label htmlFor="new-pwd">
                    New password
                    <p> * </p>
                </label>
                <input id = "new-pwd" name = "new-pwd" type = "password" value = {newPassword}  onChange = {(e) => {setNewPassword(e.target.value)}} />
            </div>
            <div className = "input-field">
                <label htmlFor="confirm-pwd">
                    Confirm password
                    <p> * </p>
                </label>
                <input id = "confirm-pwd" name = "confirm-pwd" type = "password" value = {confirmPassword} onChange = {(e) => {setConfirmPassword(e.target.value)}}/>
            </div>
            <ErrorInput mess = "The new password must not be shorter than 8 characters" hidden = {!newPassword || newPassword.length >= 8}/>
            <ErrorInput mess = "The confirm password must not be same as the new password" hidden = {!confirmPassword || newPassword === confirmPassword}/>
            {(!newPassword || newPassword.length >= 8) && (!confirmPassword || newPassword === confirmPassword)
            && <ButtonUploadFreelancer className="button-save" name = "password" title = "SAVE" onClick = {savePassword}/>
            }
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
