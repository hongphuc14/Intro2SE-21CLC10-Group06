import './ProfileFreelancer.scss'
import logo from '../../logo.png';
import HeaderFreelancer from '../../Components/Header/HeaderFreelancer';
import NavbarFreelancer from '../../Components/Navbar/NavbarFreelancer';
// import InputFieldFreelancer from '../../Components/InputField/InputFieldFreelancer';
import ButtonUploadFreelancer from '../../Components/Button/ButtonUploadFreelancer';
import AttractionFreelancer from '../../Components/Attraction/AttractionFreelancer';

const attractions = [
  {
    img: logo,
    title: 'abc',
    description: 'abc'
  },
  {
    img: logo,
    title: 'abc',
    description: 'abc'
  },
]

const freelancer = {
  fullname: 'abc',
  date_of_birth: Date.now(),
  gender: 1,
}

const verified = true

const changePassword = false

const destination =[
  {
    id: 1,
    name: 'TPHCM'
  },
  {
    id: 2,
    name: 'Ha Noi'
  },
  {
    id: 3,
    name: 'Da Nang'
  }
]

function ProfileFreelancer(){
  return(

    <div className="profile-freelancer">
      <HeaderFreelancer/>
      <NavbarFreelancer img = {logo} fullname = {freelancer.fullname.toUpperCase()} flag1 = "focus"/>
      <div className = "main-profile">

        <div className = "update-profile">
          <form className = "form-profile">
            <div className = "input-field">
                <label htmlFor="fullname">
                    Full name
                    <p> * </p>
                </label>
                <input id = "fullname" name = "fullname" type = "text" required />
            </div>
            <div className = "input-field">
                <label htmlFor="dob">
                    Date of birth <p> * </p>
                </label>
                <input id = "dob" name = "dob" type = "date" required />
            </div>
            <div className = "check-box">
              <legend> Gender <p> * </p> </legend>
                <input id = "male" type = "radio" name = "gender" value = "male"></input>
                <label htmlFor="male">Vietnamese</label>
                <input id = "female" type = "radio" name = "gender" value = "female"></input>
                <label htmlFor="female">English</label>
            </div>
            <div className = "input-field">
                <label htmlFor="des">
                    Destination
                    <p> * </p>
                </label>
                <select id="des" name="des">
                  {
                    destination.map((des)=> <option key = {des.id} value = {des.name}> {des.name} </option>)
                  }
                </select>
            </div>
            <div className = "input-field">
                <label htmlFor="phone">
                    Phone number
                    <p> * </p>
                </label>
                <input id = "phone" name = "phone" type = "number" required />
            </div>
            <div className = "check-box">
              <legend> Language <p> * </p> </legend>
                <input id = "VN" type = "checkbox" name = "language" value = "VN"></input>
                <label htmlFor="VN">Vietnamese</label>
                <input id = "EN" type = "checkbox" name = "language" value = "EN"></input>
                <label htmlFor="EN">English</label>
            </div>
            <div className = "input-field">
                <label htmlFor="exp">
                    Experience (years)
                    <p> * </p>
                </label>
                <input id = "exp" name = "exp" type = "number" min = {0} required />
            </div>
            <div className = "input-field">
                <label htmlFor="desc">
                    Description
                    <p> * </p>
                </label>
                <textarea id = "desc" type = "text"></textarea>
            </div>
            <div className = "input-field">
              <legend>Tourism licenses</legend>
              <ButtonUploadFreelancer className="button-upload" title = "UPLOAD A LICENSE"/>
              <ButtonUploadFreelancer className="button-upload" title = "VIEW ALL LICENSES"/>
            </div>
          </form>
          <div className = "avatar-frame">
            <div className = "picture">
                <img src={logo} alt = ""></img>
                <div className = "picture-bg">
                  <div className ="icon">
                      <i class="fas fa-edit"></i>
                  </div>
                  <div className ="icon">
                      <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
            </div>
            
            {verified && 
            <div className = "verified">
                <i class="fas fa-user-check"></i>
                Verified user account
            </div>}
        </div>
        </div>
        <ButtonUploadFreelancer className="button-save" title = "SAVE CHANGES" disabled/>
        <div class = "hr"></div>

        <div className = "show-attraction">
          <p>Must-see attractions</p>
          {attractions.map((attraction,index) => <AttractionFreelancer {...attraction} index={index}/>)}
          <AttractionFreelancer />
          <ButtonUploadFreelancer className="button-save" title = "ADD" disabled/>
          <ButtonUploadFreelancer className="button-upload" title = "DELETE" />
        </div>
        <div class = "hr"></div>
        <div className = "setting">
          <div className = "info">
            <div className = "input-field">
                <label htmlFor="email">
                    Email address
                    <p> * </p>
                </label>
                <input id = "email" name = "email" type = "email" value = {freelancer.fullname} disabled/>
            </div>
            <div className = "input-field">
                <label htmlFor="pwd">
                    Password
                    <p> * </p>
                </label>
                <input id = "pwd" name = "pwd" type = "password" value = {freelancer.date_of_birth} disabled/>
            </div>
            {!changePassword &&
            (<ButtonUploadFreelancer className="button-upload" title = "CHANGE PASSWORD" />)}
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
            <ButtonUploadFreelancer className="button-upload" title = "BACK" />
          </div>
          }
              
        </div>

        <div class = "hr"></div>      

        <a href = "https://www.google.com/" className = "delete-acc">Delete account</a>
        <a href = "https://www.google.com/" className = "log-out">Log out</a>        
      </div>
  </div>
  );
}

export default ProfileFreelancer;
