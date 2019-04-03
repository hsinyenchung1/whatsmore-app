import React from 'react';
import classes from './Confirm.css';

const Confirm = (props) => (
  <div className={classes['Confirm']}>
    <div className={classes['ConfirmWrapper']}>
      <div className={classes['Title']}>
        Thank you for your order. You will receive an email with order confirmation and pickup instruction. 
      </div>
    </div>
  </div>

);

export default Confirm;