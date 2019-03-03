import React from 'react';
import classes from './Order.css';
import OrderData from './OrderData/OrderData';

const Order = (props) => (
  <div className={classes.Order}>
    <div className={classes.Form}>
      <div className={classes.title}>Place An Order</div>
      <OrderData toggleSpinner={props.toggleSpinner} />
    </div>
  </div>
);

export default Order;