import './ProfileCompany.scss'
import placeholder from '../../placeholder-image.png'
import HeaderCompany from '../../Components/Header/HeaderCompany';
import NavbarCompany from '../../Components/Navbar/NavbarCompany';
import ErrorInput from '../../Components/Message/ErrorInput'
import {ButtonEditFreelancer, ButtonDeleteFreelancer, ButtonUploadFreelancer} from "../../Components/Button/ButtonFreelancer"

import { useSelector, useDispatch } from "react-redux";
import {Link, useLocation} from "react-router-dom"
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
// import image from '../../../../../BackEnd/public/freelancer_avatar'
import {logOutAction} from '../../redux/actions/BasicAction'
import { getCompanyInfo, getCompanyLicense, updateCompanyPassword,
  updateCompanyLicense, updateCompanyAvatar, updateCompanyInfo} from '../../redux/actions/CompanyAction';

export default function ProfileCompany(){
  const dispatch = useDispatch()
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);

  const {user_login} = useSelector(state => state.BasicReducer)
  const {verified, company_info, company_license} = useSelector(state => state.CompanyReducer)

  // // login mới get để lưu vào state
  useEffect(() => {
    dispatch(getCompanyInfo(user_login.email))
  },[] )

  useEffect(() => {
    if (company_info?.id_company) {
      dispatch(getCompanyLicense(company_info.id_company))
    }
  }, [company_info.id_company])

  const handleChangeInfo = (e)=> {
    formik.handleChange(e);
    setSaveChanges(true)
  }

  let {license, isDelete, info, isChange, pre} = location.state ? location.state : {}
  if (!license)
    license = company_license

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
  // // console.log(uploadedLicense)
  // // console.log('-', license)

  const importAvatar =  (filename) =>  {
    if (typeof filename === 'undefined' || filename === "")
      return null
    // filename = "tourist_2.jpg"
    try{
      const path =  require(`../../../../../BackEnd/public/company_avatar/${filename}`)
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

  const [saveChanges, setSaveChanges] = useState(isChange || isDelete || license.length > company_license.length || false )
  const handleSaveChanges = () => {
    const newInfo = {...formik.values}
    // console.log(preview)
    if (preview)
      dispatch(updateCompanyAvatar(newInfo.id_company, preview))
    dispatch(updateCompanyInfo(newInfo.id_company, newInfo))
    dispatch(updateCompanyLicense(newInfo.id_company, [...license, ...uploadedLicense]))
    console.log([...license, ...uploadedLicense])
    setSaveChanges(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: info || {...company_info},
    onSubmit: handleSaveChanges,
    validationSchema: yup.object().shape({
      name: yup.string().max(50,"Company name has the maximum of 50 characters").min(5,"Company name must have at least 5 characters").required('Company name is required'),
      phone: yup.string().test('len', 'Phone number must have exactly 10 digits', val => val && val.toString().length === 10).required('Phone number is required'),
      address: yup.string().required('Address is required'),
      website: yup
      .string()
      .url("Website must be a valid URL")
    }),
  })
  
  const [changePassword, setChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const savePassword = () => {
    dispatch(updateCompanyPassword(company_info.id_company, currentPassword, newPassword))
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  // console.log(verified)

  return(
    <div className="profile-company">
      <HeaderCompany/>
      <NavbarCompany src = {importAvatar(company_info?.avatar) || placeholder} name = {company_info?.name?.toUpperCase()} flag1 = "focus"/>
      <div className = "main-profile">
        <form className = "update-profile" onSubmit = {formik.handleSubmit}>
          <div className = "form-profile">
            <div className = "input-field">
                <label htmlFor="name">
                    Company name
                    <p> * </p>
                </label>
                <input id = "name" name ="name" type = "text" value = {formik.values.name || ''} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)} required/>
            </div>
            <ErrorInput mess = {formik.errors.name} hidden = {!formik.errors.name}/>
            <div className = "input-field">
                <label htmlFor="address">
                    Address<p> * </p>
                </label>
                <input id = "address" name = "address" type = "text" value = {formik.values.address || ''} onChange = {(e)=>handleChangeInfo(e, formik.handleChange)}  required />
            </div>
            <ErrorInput mess = {formik.errors.address} hidden = {!formik.errors.address}/>
            <div className = "input-field">
                <label htmlFor="phone">
                    Phone number
                    <p> * </p>
                </label>
                <input id = "phone" name = "phone" type = "tel" value = {formik.values.phone || ''} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>
            <ErrorInput mess = {formik.errors.phone} hidden = {!formik.errors.phone}/>
            <div className = "input-field">
                <label htmlFor="website">
                    Website
                </label>
                <input id = "website" name = "website" type = "text" value = {formik.values.website || ''} onChange = {(e)=>handleChangeInfo(e,formik.handleChange)} required />
            </div>
            <ErrorInput mess = {formik.errors.website} hidden = {!formik.errors.website}/>

            <div className = "input-field last">
              <legend>Tourism licenses</legend>
              <input type="file" id = "license" name = "license" accept="image/*" onChange = {(e) => {handleUploadLicense(e)}}/>
              <Link to = {{pathname: "/license-company", 
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

        <div className = "setting">
          <div className = "info">
            <div className = "input-field">
                <label htmlFor="email">
                    Email address
                    <p> * </p>
                </label>
                <input id = "email-setting" name = "email" type = "email" value = {formik?.values?.email || ''} disabled/>
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

        <a href = "/" className = "log-out" onClick = {() => dispatch(logOutAction())}>Log out</a>        
      </div>
  </div>
  );
}
