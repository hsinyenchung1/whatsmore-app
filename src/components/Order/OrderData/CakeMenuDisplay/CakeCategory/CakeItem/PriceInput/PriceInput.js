import React from 'react';
import classes from './PriceInput.css';

function PriceInput(props) {

    let size = "";

    if (props.size === "6/2") {
        size = "half 6\"";
    } else if (props.size === "none") {
        size = ""
    } else {
        size = props.size + `"`;
    }

    return (
        <div className={(props.category === 'boxed_cakes') ? classes['PaddingNone'] : classes['Container']}>
            <div>{size}</div>
            {(props.category === 'boxed_cakes') ? (
                <span>
                    <span className={classes['PaddingLeft']}>
                        ${'[' + props.price + ']'}
                    </span>
                    <input
                        className={classes.Input}
                        name={props.id}
                        type="number"
                        onChange={props.updateCakeAmountChangedHandler} />
                </span>
            ) : (
                    <div className={classes['Price']}>
                        ${'[' + props.price + ']'}
                        <div>
                            <input
                                className={classes.Input}
                                name={props.id}
                                type="number"
                                onChange={props.updateCakeAmountChangedHandler} />
                        </div>
                    </div>

                )}

        </div>
    );
}

export default PriceInput;
