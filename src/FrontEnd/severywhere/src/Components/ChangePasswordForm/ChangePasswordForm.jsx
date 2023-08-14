import './ChangePasswordForm.scss'


export default function ChangePasswordForm() {
    return (
        <div className="changepw-form-container">
            <p>CHANGE PASSWORD</p>
            <form className="changepw-form">
                <label>Current Password *</label>
                <input type="password" placeholder="********" id="currentpassword" name="currentpassword" />


                <label>New Password *</label>
                <input type="password" placeholder="********" id="newpassword" name="newpassword" />

                <label>Confirmed Password *</label>
                <input type="password" placeholder="********" id="confirmedpassword" name="confirmedpassword" />

                <button type="submit" className="changepw">Save</button>
            </form>
        </div>
    )
}