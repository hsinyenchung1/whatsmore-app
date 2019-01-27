import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div onClick={props.clicked} className={classes.DrawerToggle}>
    <i className="fas fa-bars fa-lg"></i>
  </div>
);

export default drawerToggle;