import React from 'react';
import classes from './PriceInput.css';

function PriceInput(props) {

    let size = "";

    if(props.size === "6/2"){
        size = "(half 6" + `"` + ")";
    }else if (props.size === "none"){
        size = ""
    }else {
        size = "(" + props.size + `"` + ")";
    }

    return (
        <span >
            <span>${props.price}{size}</span>
            <input className={classes.Input} name={props.id} type="number" onChange={props.updateCakeAmountChangedHandler}/>
        </span>
    );
}

export default PriceInput;
