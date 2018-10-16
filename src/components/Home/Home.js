import React from 'react';
import Logo from '../Logo/Logo';
import classes from './Home.css';

const Home = (props) => (
  <div className={classes.Home}>
    <div className={classes.Logo}>
      <Logo responsive="true" logoColor="white"/>
    </div>
  </div>
);

export default Home;