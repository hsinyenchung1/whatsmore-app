import React from 'react';
import Logo from '../../assets/images/logo-sm-no-border.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    {(props.size === 'sm') ? <img className={classes['Small']} src={Logo} alt="MyLogo"/> : ''}
    {(props.size === 'md') ? <img className={classes['Medium']} src={Logo} alt="MyLogo"/> : ''}
    {(props.size === 'lg') ? <img className={classes['Large']} src={Logo} alt="MyLogo"/> : ''}
  </div>
);

export default logo;