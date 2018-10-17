import React from 'react';
import Logowhite from '../../../assets/images/logoWhite.svg';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={Logowhite} className={classes.responsive} alt="MyLogo"/>
  </div>
);

export default logo;