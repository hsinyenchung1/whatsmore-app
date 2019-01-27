import React from 'react';
import classes from './Home.css';
import specialCake from './chrxmas-cake.jpg';

const Home = (props) => (
  <div className={classes.Home}>
      <div className={classes.Cake}>
        <img src={specialCake} alt={"cake"}/>
      </div>
  </div>
);

export default Home;