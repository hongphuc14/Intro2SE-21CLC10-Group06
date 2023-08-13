import { useState } from 'react';
import './FormEdit.scss';
export default function MyForm() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleBirthdayChange = (e) => {
    const inputDate = e.target.value;
    setBirthday(formatDate(inputDate));
  };

  const formatDate = (inputDate) => {
    const parts = inputDate.split('/');

    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
    }

    return inputDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <div className="form-container"> 
    <form className = "my-form" method="post" onSubmit={handleSubmit}>
      <p>
        EDIT PROFILE
      </p>
      <div className="fullname-block">
        <label htmlFor="fullname" id = "fullnameEdit">Fullname</label>
        <div className="fullname-input">
          <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Nguyen Thi Minh Minh" id="fullname" className="fullname"/>
          <i className="fa-solid fa-pen-to-square"></i>
        </div> 
      </div>
        <div className="email-phone">
          <div className="email-block">
            <label htmlFor="email" id ="emailEdit">Email</label>
            <div className="email-input">
              <input value={email} readOnly type="email" placeholder="ntmminh21@clc.fitus.edu.vn"id="emailEdit" name="email"/>
            </div>
          </div>
          <div className="phone-block">
            <label htmlFor="phone" id = "phoneEdit">Phone number</label>
            <div className="phone-input">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0899496257" id="phonenum" name="phonenum"/>
              <i className="fa-solid fa-pen-to-square phone-icon"></i>
            </div>
          </div>
        </div>
      <div className="birthday-gender">
        <div className="birthday-block">
          <label htmlFor="birthday" id="birthdayEdit">Birthday</label>
          <div className="birthday-input">
            <input type="date" value={birthday} onChange={handleBirthdayChange} className="birthday-box"/>
          </div>
        </div>

        <div className="gender">
          <label id = "genderEdit">Gender</label>
          <div className="gender-button">
            <input type="radio" className ="option-input" name="gender" value="Male" defaultChecked/>
            <label className = "maleCheck">Male</label>
            <input type="radio" className="option-input" name="gender" value="Female"/>
            <label className = "femaleCheck">Female</label>
          </div>
        </div>
      </div>

      <button type="submit" className="SaveButton">Save</button>
      <hr/>
      <button className="DeleteAccount">Delete account</button>

    </form>
    </div>
  );
}
