import './EmailInput.scss'
import React, { useState, useRef } from 'react';

const EmailInput = () => {
    return (
        <div className="email-input">
            <div className="reset-pw">
                <p className="title">
                    RESET PASSWORD
                </p>
            </div>
            <div className="email-input-text">
                <label htmlFor="email" className="emailLabel">Your email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />
            </div>
            <button className="send-button">SEND</button>
        </div>
    );
}

export default EmailInput;