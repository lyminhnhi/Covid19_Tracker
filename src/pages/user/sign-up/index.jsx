import React from 'react';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './signup.css';

export const SignUp = () => {
  return (
    <div id="signup">
      <form
        action="#"
        className="signup-form">
        <img src="ok.png" alt="" />
        <div className="input-field">
          <i><FaUser /></i>
          <input
            type="text"
            placeholder="Username" />
        </div>
        <div className="input-field">
          <i><FaEnvelope /></i>
          <input
            type="email"
            placeholder="Email" />
        </div>
        <div className="input-field">
          <i><FaLock /></i>
          <input
            type="password"
            placeholder="Password" />
        </div>
        <button
          type="submit"
          className="signin-btn"
        >Sign Up</button>
        <p className="social-text">Or Sign up with social platforms</p>
        <div className="social-media">
          <Link to="#" className="social-icon">
            <i><FaFacebook /></i>
          </Link>
          <Link to="#" className="social-icon">
            <i><FaTwitter /></i>
          </Link>
          <Link to="#" className="social-icon">
            <i><FaGoogle /></i>
          </Link>
          <Link to="#" className="social-icon">
            <i><FaLinkedinIn /></i>
          </Link>
        </div>
      </form>

      <div className="signup-panel">
        <h3>One of us ?</h3>
        <Link to='signin'>
          <button className="panel-btn">Sign In</button>
        </Link>
      </div>
    </div>
  )
}
