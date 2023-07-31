import './ProfileFreelancer.scss'
import logo from '../../logo.png';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
import ButtonUploadFreelancer from '../../Components/Button/ButtonUploadFreelancer';
import {ButtonEditFreelancer, ButtonDeleteFreelancer} from "../../Components/Button/ButtonFreelancer"
import AttractionFreelancer from '../../Components/Attraction/AttractionFreelancer';
import { useSelector, useDispatch } from "react-redux";
import {Link, useLocation} from "react-router-dom"
import {useState, useEffect} from 'react'

// import { BasicAction } from '../../redux/actions/BasicAction'
import { getTourGuideByIdGuide, getGuideLanguageByIdGuide, getGuideLicenseByIdGuide,getGuideAttractionByIdGuide,
        updateTourGuideByIdGuide } from '../../redux/actions/FreelancerAction';

export default function ProfileFreelancer(){
  const dispatch = useDispatch()
  const location = useLocation()
  window.history.replaceState(null, null, location.pathname);
  // login mới get để lưu vào state
  // useEffect(()=> dispatch(getTourGuideByIdGuide("tunglamtran.work@gmail.com")), [] )

  const {destination} = useSelector(state => state.BasicReducer)
  const {tour_guide_by_id_guide, guide_language_by_id_guide, verified} = useSelector(state => state.FreelancerReducer)
  const {license, isDelete} = location.state ? location.state : {}
  const [changePassword, setChangePassword] = useState(false)

  const [info, setInfo] = useState(tour_guide_by_id_guide)
  const handleChangeInfo = (e, type)=> {
    setInfo({...info, [type]:e.target.value})
    setSaveChanges(true)
  }

  const [language, setLanguage] = useState(guide_language_by_id_guide)
  const handleChangeLanguage = (e) => {
    let tmp = [...language]
    const val = parseInt(e.target.value)
    if (tmp.includes(val))
      tmp = tmp.filter(lang => lang !== val)
    else
      tmp.push(val)
    setLanguage([...tmp])
    setSaveChanges(true)
  }

  const [saveChanges, setSaveChanges] = useState(isDelete ? isDelete : false)
  const handleSaveChanges = () => {
    info.gender = parseInt(info.gender)
    info.id_des = parseInt(info.id_des)
    dispatch(updateTourGuideByIdGuide(info.id_guide, info, language, license))
    setSaveChanges(false)
  }

  console.log(location)
  return(
    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer img = {logo} fullname = {tour_guide_by_id_guide.fullname.toUpperCase()} flag1 = "focus"/>
      <div className = "main-profile">
        <div className = "update-profile">
          <form className = "form-profile" method = "POST">

            <div className = "input-field">
                <label htmlFor="fullname">
                    Full name
                    <p> * </p>
                </label>
                <input id = "fullname" name ="fullname" type = "text" value = {info.fullname} onChange = {(e)=>handleChangeInfo(e,"fullname")} required/>
            </div>

            <div className = "input-field">
                <label htmlFor="dob">
                    Date of birth <p> * </p>
                </label>
                <input id = "dob" name = "dob" type = "date" defaultValue = {info.birthday} onChange = {(e)=>handleChangeInfo(e,"birthday")}  required />
            </div>

            <div className = "check-box">
              <legend> Gender <p> * </p> </legend>
              <input id = "male" type = "radio" name = "gender" value = {0} defaultChecked ={info.gender === 0} onChange = {(e)=>handleChangeInfo(e,"gender")}></input>
              <label htmlFor="male">Male</label>
              <input id = "female" type = "radio" name = "gender" value = {1} defaultChecked ={info.gender === 1} onChange = {(e)=>handleChangeInfo(e,"gender")}></input>
              <label htmlFor="female">Female</label>
            </div>

            <div className = "input-field">
                <label htmlFor="des">
                    Destination
                    <p> * </p>
                </label>
                <select id="des" name="des" defaultValue={info.id_des} onChange={(e)=>handleChangeInfo(e,"id_des")}>
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
                <input id = "phone" name = "phone" type = "tel" value = {info.phone} onChange = {(e)=>handleChangeInfo(e,"phone")} required />
            </div>

            <div className = "check-box">
              <legend> Language <p> * </p> </legend>
                <input id = "VN" type = "checkbox" name = "language" value = {1} defaultChecked ={language.includes(1)} onChange = {handleChangeLanguage}></input>
                <label htmlFor="VN">Vietnamese</label>
                <input id = "EN" type = "checkbox" name = "language" value = {2} defaultChecked ={language.includes(2)} onChange = {handleChangeLanguage}></input>
                <label htmlFor="EN">English</label>
            </div>

            <div className = "input-field">
                <label htmlFor="exp">
                    Experience (years)
                    <p> * </p>
                </label>
                <input id = "exp" name = "exp" type = "text" value = {info.experience} onChange = {(e)=>handleChangeInfo(e,"experience")} required />
            </div>

            <div className = "input-field type2">
                <label htmlFor="desc">
                    Description
                    <p> * </p>
                </label>
                <textarea id = "desc" name = "desc" type = "text" value = {info.description} onChange = {(e)=>handleChangeInfo(e,"description")} ></textarea>
            </div>

            <div className = "input-field">
              <legend>Tourism licenses</legend>
              <input type="file" id = "license" name = "license" accept="image/*"/>
              <Link to = "/license-freelancer">
                <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES"/>
              </Link>
            </div>
          </form>

          <div className = "avatar-frame">
            <div className = "picture">
                <img src={logo} alt = ""></img>
                <div className = "picture-bg">
                  <ButtonEditFreelancer/>
                  <ButtonDeleteFreelancer/>
                </div>
            </div>
            
            {verified && 
            <div className = "verified">
                <i className="fas fa-user-check"></i>
                Verified user account
            </div>}
        </div>
        </div>
        <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" onClick = {handleSaveChanges} disabled = {!saveChanges}/>
        
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
                <input id = "email" name = "email" type = "email" value = {info.fullname} disabled/>
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
                <input id = "new-pwd" name = "new-pwd" type = "password"/>
            </div>
            <div className = "input-field">
                <label htmlFor="confirm-pwd">
                    Confirm password
                    <p> * </p>
                </label>
                <input id = "confirm-pwd" name = "confirm-pwd" type = "password"/>
            </div>
            <ButtonUploadFreelancer className="button-save" title = "SAVE" />
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
