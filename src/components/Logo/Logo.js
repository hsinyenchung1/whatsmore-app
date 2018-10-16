import React from 'react';
import Logo from '../../assets/images/logo.svg';
import Logowhite from '../../assets/images/logoWhite.svg';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={props.logoColor === "white" ? Logowhite : Logo} className={props.responsive ? classes.responsive : null} alt="MyLogo"/>
  </div>
);

export default logo;