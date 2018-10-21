import React from 'react';
import classes from './Footer.css';
import { Link } from 'react-router-dom';

const Footer = (props) => (
  <div className={classes.Footer}>
    <div> whaT's More </div>
    <div> BUTTERCREAM CAKES // MODERN DESIGN </div>
    <div>SERVING THE SAN FRANCISCO BAY AREA </div>
    <div>
      <i className="fab fa-instagram"></i><i className="fab fa-facebook-f"></i>
      </div>
      <div>
        <Link to="/home"> HOME</Link>
        <Link to="/menu"> MENU</Link>
        <Link to="policy"> POLICY</Link>
        <Link to="order"> ORDER</Link>
        <Link to="cake"> CAKE</Link>
      </div>
  </div>
);

export default Footer;