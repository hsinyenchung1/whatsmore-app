import React from 'react';
import classes from './Footer.css';
import { Link } from 'react-router-dom';

const Footer = (props) => (
  <div className={classes.Footer}>
    <div className={classes.Description}>
        <div>whaT's More</div>
        <div>UNIQUE DESIGN CAKE STUDIO</div>
    </div>



    <div className={classes.SocialMedia}>
      <a href="https://www.instagram.com/whatsmorecake/" target="_blank" rel="noopener"><i className="fab fa-instagram fa-lg"></i></a>
    </div>
  </div>
);

export default Footer;