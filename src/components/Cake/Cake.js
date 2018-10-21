import React, { Component } from 'react';
import classes from './Cake.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/cakes', false, /\.(png|jpe?g|svg)$/));

class Cake extends Component {

  render() {

    const cakeImages = images.map((item, index) => {
      return <img key={index} src={item} className={classes.Image} alt={"cake" + index}/>
    });

    return (<div className={classes.Cake}>
      <div className={classes.Container}>
          {cakeImages}
      </div>
    </div>)
  }
}

export default Cake;