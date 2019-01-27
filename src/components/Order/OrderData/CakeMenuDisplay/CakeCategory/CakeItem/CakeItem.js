import React, { Component } from 'react';
import classes from './CakeItem.css';
import PriceInput from './PriceInput/PriceInput';

class CakeItem extends Component {
    render() {
        const inputs = [];
        
        for (let i in this.props.items) {
            inputs.push(<PriceInput key={i} size={this.props.items[i].size} price={this.props.items[i].price} id={this.props.items[i].id} updateCakeAmountChangedHandler={this.props.updateCakeAmountChangedHandler}/>);
        }

        return (

            <div>
                <div>{this.props.name}</div>
                <div className={classes.PriceRow}>
                    {inputs}
                </div>
            </div>
        );
    }
}

export default CakeItem;
