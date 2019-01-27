import React, { Component } from 'react';
import classes from './CakeCategory.css';
import CakeItem from './CakeItem/CakeItem';


class CakeCategory extends Component {
  
  render() {
    
    const cakeItems = [];
    for(let cake in this.props.cakes){

      // same cake but different size
      // collect sizes and pass it down to cakeItems
      const priceAndSize = [];
  
      for(let item in this.props.cakes[cake]) {
        const currItem = {
          "size": this.props.cakes[cake][item]["size"],
          "price": this.props.cakes[cake][item]["price"],
          "id": this.props.cakes[cake][item]["id"]
        }

        priceAndSize.push(currItem);
      }
    
      cakeItems.push(<CakeItem key={cake} name={cake} items={priceAndSize} updateCakeAmountChangedHandler={this.props.updateCakeAmountChangedHandler}/>)
    }
  
    return (
      <div className={classes.Container}>
          <div className={classes.Title}>
            {this.props.category}
          </div>
          {cakeItems}
      </div>
    );
  }
}

export default CakeCategory;
