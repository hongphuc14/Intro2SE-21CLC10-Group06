import "./LoginBox.scss"
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { logInAction } from "../../redux/actions/BasicAction";

const LoginBox = () =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user_login = {
            email: email,
            password: pass
        };
        dispatch(logInAction(user_login));
    };
    return(
        <div className = "auth-form-container">
            <form className = "login-form" onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                <div className = "mailInput">
                    <input value= {email} onChange={(e) =>setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email">
                    </input>
                </div>
                
                <div className = "passInput">
                    <input value = {pass} onChange={(e) =>setPass(e.target.value)}type="password" placeholder="********" id="password" name="password"/>
                </div>
                <a className="Forgetpw" href = "/emailResetpw">Forget your password?</a>
                <button type = "submit" className="submitBut">Login</button>
                <a className = "Register" href = "/signup">Don't have an account? Register</a>
            </form>
        </div>
        
    )
}

export default LoginBox;