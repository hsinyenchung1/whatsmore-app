import React from 'react';
import classes from './Confirm.css';

const Confirm = (props) => (
  <div className={classes['Confirm']}>
    <div className={classes['ConfirmWrapper']}>
      <div className={classes['Title']}>
        Thank you for your order. The order confirmation and the pick up instruction will be emailed to you shorly. 
      </div>
    </div>
  </div>

);

export default Confirm;