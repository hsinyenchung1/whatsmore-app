import React from 'react';
import classes from './Rwd.css';

const Rwd = (props) => {

  return (
    <div className={classes.Rwd}>
      {props.children}
    </div>
  );
};


export default Rwd;