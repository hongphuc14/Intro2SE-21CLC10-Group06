import "./LoginBox.scss"
import React, {useState} from "react";

const LoginBox = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email);
    }
    return(
        <div className = "auth-form-container">
            <form className = "login-form">
                <h2>LOGIN</h2>
                <div className = "mailInput">
                    <input value= {email} onChange={(e) =>setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email">
                    </input>
                </div>
                
                <div className = "passInput">
                    <input value = {pass} onChange={(e) =>setPass(e.target.value)}type="password" placeholder="********" id="password" name="password"/>
                </div>
                <a className="Forgetpw" href = "https://colorhunt.co/palettes/green">Forget your password?</a>
                <button type = "submit" className="submitBut">Login</button>
                <a className = "Register" href = "/signup">Don't have an account? Register</a>
            </form>
        </div>
        
    )
}

export default LoginBox;