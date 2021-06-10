import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fakeAuth } from '../../auth/auth';
import { toggleOff } from "../../slices/userSlice";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import logo from "../../img/og-corona.png"
import './header.css';

export const Header = () => {
  const history = useHistory();
  const isInfo = useSelector(state => state.user.isInfo);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogin() {
    fakeAuth.signout(() => {
      history.push("/");
    })
    handleClose()
    dispatch(toggleOff(isInfo))
  }

  return (
    <header className="header-container">
      <div>
        <NavLink
          className="navbar"
          to='/'>
          <img src={logo} alt="" />
        </NavLink>
      </div>

      <div className={(isInfo) ? 'menu-off' : 'menu'}>
        <ul>
          <li>
            <NavLink activeStyle={{color: 'red'}} to='/signin'>Sign In</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{color: 'red'}} to='/signup'>Sign Up</NavLink>
          </li>
        </ul>
      </div>

      <div className={(isInfo) ? 'menu' : 'menu-off'}>
        <div className="dropdown">
          <Button 
          className="drop_button"
          aria-controls="simple-menu" 
          aria-haspopup="true" 
          onClick={handleClick}>
            Welcome!
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Your Profile</MenuItem>
            <MenuItem onClick={handleLogin}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  )
}
