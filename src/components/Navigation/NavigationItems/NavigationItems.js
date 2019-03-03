import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/home'>HOME</NavigationItem>
    {/* <NavigationItem link='/menu'> MENU </NavigationItem> */}
    {/* <NavigationItem link='/policy'> POLICY</NavigationItem> */}
    <NavigationItem link='/order'>ORDER</NavigationItem>
    {/* <NavigationItem link='/cake'>CAKE</NavigationItem> */}
  </ul>
);

export default navigationItems;