import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
  // static nav item. It pops up a new tab.
  props.isStatic ?   (
    <li className={classes.NavigationItem}>
      <a target='_blank' href={props.link} activeClassName={classes.active}> {props.children}</a>
    </li>
  ):
  // regular nav item
  (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link} activeClassName={classes.active}> {props.children}</NavLink>
    </li>
  )
);

export default navigationItem;