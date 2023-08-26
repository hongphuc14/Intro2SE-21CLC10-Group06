import './ChangePasswordForm.scss'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTouristInfo, updateTouristPassword } from '../../redux/actions/TouristAction'

export default function ChangePasswordForm() {
    const dispatch = useDispatch()
    const { user_login } = useSelector(state => state.BasicReducer)
    const { tourist_info } = useSelector(state => state.TouristReducer)
  
    useEffect(() => {
      dispatch(getTouristInfo(user_login.email))
    }, [])


    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
  
    const savePassword = () => {
        if (currentPassword.length < 8 || newPassword.length < 8) 
            alert("The password must be at least 8 characters")
        else if (newPassword !== confirmPassword)
            alert("The confirm password must be same as the new password")
        else{
            dispatch(updateTouristPassword(tourist_info.id_tourist, currentPassword, newPassword))
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <div className="changepw-form-container">
            <p>CHANGE PASSWORD</p>
            <form className="changepw-form">
                <label>Current Password *</label>
                <input type="password" placeholder="********" id="currentpassword"
                value = {currentPassword} onChange = {(e) => setCurrentPassword(e.target.value)} />


                <label>New Password *</label>
                <input type="password" placeholder="********" id="newpassword" 
                value = {newPassword} onChange = {(e) => setNewPassword(e.target.value)} />

                <label>Confirmed Password *</label>
                <input type="password" placeholder="********" id="confirmedpassword"
                value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}/>

                <button type="button" className="changepw" onClick = {savePassword}>Save</button>
            </form>
        </div>
    )
}