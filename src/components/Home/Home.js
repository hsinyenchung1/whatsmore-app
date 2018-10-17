import React from 'react';
import classes from './Home.css';
import Logo from './Logo/Logo';

const Home = (props) => (
  <div className={classes.Home}>
      <div className={classes.Logo}>
        <Logo />
      </div>
  </div>
);

export default Home;