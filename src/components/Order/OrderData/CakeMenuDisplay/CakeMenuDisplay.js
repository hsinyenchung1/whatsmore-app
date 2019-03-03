import React, { Component } from 'react';
import CakeCategory from './CakeCategory/CakeCategory';
import classes from './CakeMenuDisplay.css';


class CakeMenuDisplay extends Component {


  render() {

    let Categories = [];
    for (let category in this.props.cake_index_obj) {
      Categories.push(
        <div
          key={category}
          className={classes[category.toUpperCase()]}>
          <CakeCategory
            category={category}
            cakes={this.props.cake_index_obj[category]}
            updateCakeAmountChangedHandler={this.props.updateCakeAmountChangedHandler}
          />
        </div>

      )
    }
    return (
      <div className={classes['MenuDisplay']}>
        {Categories}
      </div>
    );
  }
}

export default CakeMenuDisplay;
