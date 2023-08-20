import "./SignupBox.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../redux/actions/BasicAction";

const SignupBox = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [idRole, setIdRole] = useState(-1);
    
    const handleSignup = (e)=>{
        //e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if(pass === confirmPass && pass.length >= 8 && regex.test(email) && idRole !== -1){
            const user_signup = {
                email: email,
                password: pass,
                id_role: idRole
            };
            console.log("user_signup: ", user_signup);
            dispatch(signUpAction(user_signup));
        }
        else if (!regex.test(email)){
            alert("Email is invalid. Please try again!!!");
            return;
        }
        else if (pass.length < 8){
            alert("Passwords is too short. Please try again!!!");
            return;
        }
        else if (pass !== confirmPass){
            alert("Passwords do not match. Please try again!!!");
            return;
        }
        else{
            alert("Please choose your role!!!");
            return;
        }
        // Clear form fields after signup
        setEmail('');
        setPass('');
        setConfirmPass('');
        setIdRole('');
    };
    return (  
        <div id="signup-container">
            <div id="signup-left">
                <p className="signup-title">SIGN UP</p>
                <p className="signup-subtitle">Create your new account</p>
                <ul className="signup-input">
                    <li><input type="text" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)}/></li>
                    <li><input type="password" placeholder="Password *" value={pass} onChange={(e) => setPass(e.target.value)}/></li>
                    <li><input type="password" placeholder="Confirm password *" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/></li>
                </ul>
                <div class="signup-button">
                    <input type="submit" value="SIGN UP" onClick={handleSignup}/>
                </div>
            </div>
            <div id="signup-right">
                <p className="role-title">Who are you?</p>
                <ul className="role-option">
                <li><input type="button" value="Tourist" className = { idRole === 1 ? "active" : ""} onClick={() => setIdRole(1)}/></li>
                    <li><input type="button" value="Tour Company" className = { idRole === 2 ? "active" : ""} onClick={() => setIdRole(2)}/></li>
                    <li><input type="button" value="Tour Guide" className = { idRole === 3 ?"active" : ""} onClick={() => setIdRole(3)}/></li>
                </ul>
                
            </div>
        </div>
    );
}
 
export default SignupBox;