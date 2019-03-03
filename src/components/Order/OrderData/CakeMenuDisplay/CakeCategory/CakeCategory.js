import React, { Component } from 'react';
import classes from './CakeCategory.css';
import CakeItem from './CakeItem/CakeItem';


class CakeCategory extends Component {

  state = {
    'chiffon_cakes': ['4"', '5"', '6"'],
    'crepe_cakes': ['half 6"', '6"', '8"'],
    'boxed_cakes': ['One Size']
  }

  formatTitle = (category) => {
    let words = category.split('_');
    for (let w in words) {
      words[w] = words[w][0].toUpperCase() + words[w].substring(1, words[w].length);
    }
    return words.join(' ');;
  }

  toUpperCaseFirstWord = (name) => {
    let words = name.split(' ');
    for (let w in words) {
      words[w] = words[w][0].toUpperCase() + words[w].substring(1, words[w].length);
    }
    return words.join(' ');;
  }

  render() {

    const cakeItems = [];

    for (let cake in this.props.cakes) {

      // same cake but different size
      // collect sizes and pass it down to cakeItems
      const priceAndSize = [];

      for (let item in this.props.cakes[cake]) {
        const currItem = {
          "size": this.props.cakes[cake][item]["size"],
          "price": this.props.cakes[cake][item]["price"],
          "id": this.props.cakes[cake][item]["id"],
          "category": this.props.cakes[cake][item]["category"]
        }
        priceAndSize.push(currItem);
      }

      cakeItems.push(
        <CakeItem 
          key={cake} 
          name={this.toUpperCaseFirstWord(cake)} 
          items={priceAndSize}
          updateCakeAmountChangedHandler={this.props.updateCakeAmountChangedHandler} 
        />)
    }

    return (
      <div className={classes['Container']}>
        <div className={classes['Title']}>
          {this.formatTitle(this.props.category)}
        </div>

        <div className={classes['cakeItems']}>
          {/* <div className={classes['Size']}>
            {this.state[this.props.category].map((size, index) => (
              <div key={index} className={classes['A-Size']}>{size}</div>
            ))}
          </div> */}
          {cakeItems}
        </div>
      </div>
    );
  }
}

export default CakeCategory;
