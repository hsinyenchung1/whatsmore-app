import React from 'react';
import Logo from '../../assets/images/logo-no-border.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={Logo} alt="MyLogo"/>
  </div>
);

export default logo;