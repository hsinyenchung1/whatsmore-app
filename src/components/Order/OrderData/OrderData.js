import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import axios from 'axios';
import Button from '../../UI/Button/Button';

class OrderData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: ''
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your Phone'
        },
        value: ''
      },
      paymentMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'paypal', displayValue: 'PayPal' },
            { value: 'venmo', displayValue: 'Venmo' },
            { value: 'cash', displayValue: 'Cash' },
            { value: 'chasequickpay', displayValue: 'Chase QuickPay'}
          ]
        },
        value: ''
      },
      message: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Your Message'
        },
        value: ''
      }
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
      ...this.state.orderForm
    }

    const updateFormElement = {
      ...updateOrderForm[inputIdentifier]
    }

    updateFormElement.value = event.target.value;
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({orderForm: updateOrderForm});

  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    formData["orderTime"] =  Date.now();

    const order = {
      orderData: formData
    }

    console.log(order);
    axios.post('http://localhost:3001/api/Orders', order.orderData)
      .then(response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
        // this.props.history.push('/cake');
      })

    // axios.get('http://localhost:3001/api/Orders')
    // .then(response => {
    //   console.log(response);
    // })
    // .catch( error => {
    //   console.log(error);
    // })
  }


  render() {

    const formElementSArray = [];
    for (let key in this.state.orderForm) {
      formElementSArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <form onSubmit={this.orderHandler}>
        {formElementSArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" clicked={this.orderHandler}> Submit</Button>
      </form>
    );
  }
}

export default OrderData;
