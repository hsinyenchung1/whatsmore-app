import React, { Component } from 'react';
import classes from './CakeItem.scss';
import PriceInput from './PriceInput/PriceInput';

class CakeItem extends Component {
    render() {
        const inputs = [];
        
        for (let i in this.props.items) {
            inputs.push(
                <PriceInput 
                    key={i} 
                    size={this.props.items[i].size} 
                    price={this.props.items[i].price} 
                    id={this.props.items[i].id} 
                    category={this.props.items[i].category} 
                    updateCakeAmountChangedHandler={this.props.updateCakeAmountChangedHandler}/>
            );
        }

        return (

            <div>
                <div className={classes['Name']}>{this.props.name}</div>
                <div className={classes['PriceRow']}>
                    {inputs}
                </div>
            </div>
        );
    }
}

export default CakeItem;
