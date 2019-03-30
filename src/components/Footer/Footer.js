import React from 'react';
import classes from './Footer.css';

const Footer = (props) => (
  <div className={classes.Footer}>
    <div className={classes.Description}>
        {/* <div>whaT's More</div> */}
        <div>Cake Designing Studio</div>
        <div>whatsmorecake@gmail.com</div>
    </div>
    <div className={classes.SocialMedia}>
      <a href="https://www.instagram.com/whatsmorecake/" 
        target="_blank" 
        rel="noopener noreferrer">
        <i className={["fab", "fa-instagram", classes['iconSzie']].join(' ')}></i></a>
    </div>
    <div>&copy; 2019 whatsmorecake </div>
  </div>
);

export default Footer;