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
        <label htmlFor="fullname">Fullname</label>
        <div className="fullname-input">
          <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Nguyen Thi Minh Minh" id="fullname" name="fullname"/>
          <i className="fa-solid fa-pen-to-square"></i>
        </div> 
      </div>
      <div className="email-phone">
        <div className="email-block">
          <label htmlFor="email">Email</label>
          <div className="username-input">
            <input value={email} readOnly type="email" placeholder="ntmminh21@clc.fitus.edu.vn"id="email" name="email"/>
          </div>
        </div>
        <div className="phone-block">
          <label htmlFor="phone">Phone number</label>
          <div className="phone-input">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0899496257" id="phonenum" name="phonenum"/>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
      <div className="birthday-gender">
        <div className="birthday-block">
          <label htmlFor="birthday">Birthday</label>
          <div className="birthday-input">
            <input type="date" value={birthday} onChange={handleBirthdayChange}/>
          </div>
        </div>

        <div className="gender">
          <label>Gender</label>
          <div className="gender-button">
            <label><input type="radio" name="gender" value="Male" defaultChecke/>Male</label>
            <label><input type="radio" name="gender" value="Female"/>Female</label>
          </div>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
    </div>
  );
}
