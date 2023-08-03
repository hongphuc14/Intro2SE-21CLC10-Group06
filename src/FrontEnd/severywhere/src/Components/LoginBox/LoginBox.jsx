import "./LoginBox.scss"
import React, {useState} from "react";

const LoginBox = () =>{
    return(
        <div className = "auth-form-container">
            <form className = "login-form">
                <h2>LOGIN</h2>
                <div className = "mailInput">
                    <input type="email" placeholder = "severywhere@gmail.com" id = "email" name="email">
                    </input>
                </div>
                
                <div className = "passInput">
                    <input type="password" placeholder = "********" id = "password" name="password">
                    </input>
                </div>
                <a className="Forgetpw" href = "https://colorhunt.co/palettes/green">Forget your password?</a>
                <button type = "submit" className="submitBut">Login</button>
                <a className = "Register" href = "https://colorhunt.co/palettes/green">Don't have an account? Register</a>
            </form>
        </div>
        
    )
}

export default LoginBox;