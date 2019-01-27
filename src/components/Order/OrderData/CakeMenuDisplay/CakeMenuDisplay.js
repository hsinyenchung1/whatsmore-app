import React, { Component } from 'react';
import CakeCategory from './CakeCategory/CakeCategory';


class CakeMenuDisplay extends Component {


  render() {
  
    let Categories = [];
    for(let category in this.props.cake_index_obj){
      Categories.push(<CakeCategory key={category} category={category} cakes={this.props.cake_index_obj[category]} updateCakeAmountChangedHandler=
        {this.props.updateCakeAmountChangedHandler}/>)
    }
    return (
      <div>
        {Categories}
      </div>
    );
  }
}

export default CakeMenuDisplay;
