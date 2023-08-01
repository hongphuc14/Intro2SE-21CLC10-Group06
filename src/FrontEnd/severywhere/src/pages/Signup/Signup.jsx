import "./Signup.scss";

const Signup = () => {
    return (  
        <div id="signup-background">
            <div id="signup-container">
                <div id="signup-left">
                    <p className="signup-title">SIGN UP</p>
                    <p className="signup-subtitle">Create your new account</p>
                    <ul className="signup-input">
                        <li><input type="text" placeholder="Email address *"/></li>
                        <li><input type="text" placeholder="Password *"/></li>
                        <li><input type="text" placeholder="Confirm password *"/></li>
                    </ul>
                    <div class="signup-button">
                        <input type="submit" value="SIGN UP"/>
                    </div>
                </div>
                <div id="signup-right">
                    <p className="role-title">Who are you?</p>
                    <ul className="role-option">
                        <li><input type="button" value="Tourist"/></li>
                        <li><input type="button" value="Tour Company"/></li>
                        <li><input type="button" value="Tour Guide"/></li>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Signup;