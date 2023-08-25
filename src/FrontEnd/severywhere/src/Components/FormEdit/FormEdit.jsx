import { useState, useEffect } from 'react';
import './FormEdit.scss';
import { useSelector, useDispatch } from 'react-redux'
import { getTouristInfo, updateTouristInfo } from '../../redux/actions/TouristAction'



export default function MyForm() {
  const dispatch = useDispatch()
  const { user_login } = useSelector(state => state.BasicReducer)
  const { tourist_info } = useSelector(state => state.TouristReducer)

  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    dispatch(getTouristInfo(user_login.email))
  }, [])

  // console.log(tourist_info)

  useEffect(() => {
    setFullname(tourist_info.fullname)
    setPhone(tourist_info.phone)
    setBirthday(tourist_info.birthday)
    setGender(tourist_info.gender)
  }, [tourist_info])

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
    // const form = e.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    // console.log()
    dispatch(updateTouristInfo(tourist_info.id_tourist, { fullname: fullname, phone: phone, birthday: birthday, gender: parseInt(gender) }))

  };

  return (
    <div className="form-container">
      <form className="my-form" method="post" onSubmit={handleSubmit}>
        <p>
          EDIT PROFILE
        </p>
        <div className="fullname-block">
          <label htmlFor="fullname">Fullname</label>
          <div className="fullname-input">
            <input value={fullname || ''} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Nguyen Thi Minh Minh" id="fullname" className="fullname" />
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
        <div className="email-phone">
          <div className="email-block">
            <label htmlFor="email">Email</label>
            <div className="email-input">
              <input value={tourist_info?.email || ''} readOnly type="email" placeholder="ntmminh21@clc.fitus.edu.vn" id="emailEdit" name="email" />
            </div>
          </div>
          <div className="phone-block">
            <label htmlFor="phone">Phone number</label>
            <div className="phone-input">
              <input value={phone || ''} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0899496257" id="phonenum" name="phonenum" />
              <i className="fa-solid fa-pen-to-square phone-icon"></i>
            </div>
          </div>
        </div>
        <div className="birthday-gender">
          <div className="birthday-block">
            <label htmlFor="birthday">Birthday</label>
            <div className="birthday-input">
              <input type="date" value={birthday || ''} onChange={handleBirthdayChange} className="birthday-box" />
            </div>
          </div>

          <div className="gender">
            <label>Gender</label>
            <div className="gender-button">
              <input type="radio" className="option-input" name="gender" value="0" checked={gender === "0" || false} onChange={(e) => setGender(e.target.value)} />
              <label className="maleCheck">Male</label>
              <input type="radio" className="option-input" name="gender" value="1" checked={gender === "1" || false} onChange={(e) => setGender(e.target.value)} />
              <label className="femaleCheck">Female</label>
            </div>
          </div>
        </div>

        <button type="submit" className="SaveButton">Save</button>
      </form>
    </div>
  );
}
