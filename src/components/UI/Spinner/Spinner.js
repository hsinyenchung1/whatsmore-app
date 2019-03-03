import React, { Component } from 'react';
import classes from './Spinner.scss';
class Spinner extends Component {
    render() {
        return (
            <div className={classes['Spinner']}>
                <div className={this.props.show ? classes['Covered']: ''} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '.5' : '0'
                }}>
                    <div>
                        <i className={['fas', 'fa-spinner', classes['SpinnerIcon']].join(' ')}></i>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}


export default Spinner;