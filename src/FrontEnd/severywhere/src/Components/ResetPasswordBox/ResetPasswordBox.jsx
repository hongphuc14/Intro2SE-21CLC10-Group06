import './ResetPasswordBox.scss'

export default function ResetPasswordBox() {
    return(
        <div className="resetPw-box">
            <div className="resetPw-box-title">
                <p className="Pwtitle"> RESET PASSWORD </p>
            </div>
            <div className="resetPw-box-text">
                <label htmlFor="password" className="passwordLabel">New password *</label>
                <input type="password" id="passwordReset" name="password" placeholder="********" />
                <label htmlFor="password" className="passwordLabel">Confirmed password *</label>
                <input type="password" id="passwordReset" name="password" placeholder="********" />
            </div>
            <button className="resetPw-button">RESET PASSWORD</button>
        </div>
    );
}