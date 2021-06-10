import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedinIn, FaLock, FaTwitter, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fakeAuth } from '../../../auth/auth';
import { toggleOn } from "../../../slices/userSlice";
import { message, Button, Space } from 'antd';
import './signin.css';

export const SignIn = (props) => {
  const dispatch = useDispatch();
  const isInfo = useSelector(state => state.user.isInfo);

  const success = () => {
    message.success('Successed Login');
  };
  
  const error = () => {
    message.error('Uncorrect User or Pass');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    if (username === 'admin' && password === 'admin') {
      dispatch(toggleOn(isInfo));
      fakeAuth.signin(() => {
        props.history.push("/");
        success()
      });
    } else {
      error()
    }
  }

  return (

    <div id="signin">
      <form
        onSubmit={handleLogin}
        action="#"
        className="signin-form">
        <img src="ok.png" alt="" />
        <div className="input-field">
          <i><FaUser /></i>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="none"
          />
        </div>
        <div className="input-field">
          <i><FaLock /></i>
          <input
            type="password"
            placeholder="Password"
            name="password" />
        </div>
        <button
          type="submit"
          className="signin-btn"
        >Sign In</button>
        <p className="social-text">Or Sign in with social platforms</p>
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
      <div className="signin-panel">
        <h3>New here ?</h3>
        <p>Let Create Account To Join Us !</p>
        <Link to='signup'>
          <button className="panel-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  )
}
