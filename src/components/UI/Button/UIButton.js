import React from 'react';
import { withRouter } from 'react-router-dom'
import classes from './UIButton.scss';

// const button = (props) => (
//   <button
//     className={[classes.Button, classes[props.btnType]].join('  ')}
//     onClick={props.clicked}>{props.children}</button>
// )

const button = withRouter(({ history, ...props}) => {
  let handlerClickWrapper = (event) => {
    props.clicked(event, history);
  }

  return (
    <button
      className={[classes.Button, classes[props.btnType]].join('  ')}
      onClick={handlerClickWrapper}>{props.children}
    </button>
  )
})




export default button;