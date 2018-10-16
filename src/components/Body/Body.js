import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import classes from './Body.css';

const Body = (props) => (
  <body className={classes.Body}>
    <Route to="/" component={Home} />
  </body>
);

export default Body;