import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {

  // this shouldcCompnetUpdate is to prevent modal updates 
  shouldCompnentUpdate (nextProps, nextState){
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate(){

  }

  render() {
    return (
      <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
          }}>
          {props.children}
        </div>
      </Aux>
    )
  }
}


export default modal;