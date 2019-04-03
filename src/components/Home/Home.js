import React from 'react';
import classes from './Home.css';
import specialCake from './main_cake.jpg';

const Home = (props) => (
  <div className={classes.Home}>
      <div className={classes['Cake']}>
        <img className={classes['Image']}
          src={specialCake} 
          alt={"cake"}/>
      </div>
  </div>
);

export default Home;