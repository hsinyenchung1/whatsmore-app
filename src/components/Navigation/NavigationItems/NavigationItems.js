import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/home'>Home</NavigationItem>
    {/* <NavigationItem link='/policy'> POLICY</NavigationItem> */}
    <NavigationItem link='/order'>Order</NavigationItem>
    <NavigationItem link='https://www.instagram.com/whatsmorecake/' isStatic='true'>Gallery</NavigationItem>
    {/* <NavigationItem link='/cake'>CAKE</NavigationItem> */}
  </ul>
);

export default navigationItems;