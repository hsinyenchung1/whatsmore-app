import React from 'react';
import classes from './DesignCake.scss';

const DesignCake = () => {
    return (
        <div className={classes['desgin-cake']}>
            <div className={classes['Title']}>Desginer Cake</div>
            <div className={classes['title']}>Flavors</div>
            <div className={classes['flavors']}>
                <div>Original chiffon cake & Passionfruit Chantilly cream</div>
                <div>Original chiffon cake & Salted eggs yolk and meat floss whipped cream</div>
                <div>Cocoa chiffon cake & Chocolate whipped cream</div>
                <div>Matcha chiffon cake & Matcha whipped cream</div>
                <div>Devil's food cake</div>
            </div>
            <div className={classes['title']}>Prices</div>
            <div className={classes['prices']}>
                <div>4" (3-6 serving)   starts from  $68</div>
                <div>5" (4-8 serving)   starts from  $88</div>
                <div>6" (6-12 serving)  starts from $118</div>
                <div>8" (18-24 serving) starts from $168</div>
            </div>
            <div className={classes['description']}>
                Sizes and shapes are adjustable. Prices vary depending on designs. Please contact us for more details.
           </div>
        </div>
    );
}

export default DesignCake;