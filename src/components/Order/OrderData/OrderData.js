import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import axios from 'axios';
import Button from '../../UI/Button/Button';
import CakeMenuDisplay from './CakeMenuDisplay/CakeMenuDisplay';

var minOrderDate = function () {
  var formattedNumber = function (number) {
    return ("0" + number).slice(-2);
  }

  var date_obj = new Date();
  date_obj.setDate(date_obj.getDate() + 5);
  var year = date_obj.getFullYear();
  var month = formattedNumber(date_obj.getMonth() + 1);
  var date = formattedNumber(date_obj.getDate());

  return year + '-' + month + '-' + date;
}

var maxOrderDate = function () {
  var formattedNumber = function (number) {
    return ("0" + number).slice(-2);
  }

  var date_obj = new Date();
  date_obj.setDate(date_obj.getDate() + 120);
  var year = date_obj.getFullYear();
  var month = formattedNumber(date_obj.getMonth() + 1);
  var date = formattedNumber(date_obj.getDate());

  return year + '-' + month + '-' + date;
}

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
      wechat: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your wechat'
        },
        value: ''
      },
      pickup_date: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: 'pickup time',
          min: minOrderDate(),
          max: maxOrderDate()
        },
        value: minOrderDate()
      },
      pickup_time: {
        elementType: 'input',
        elementConfig: {
          type: 'time',
          min: "11:00",
          max: "20:00",
          required: true
        },
        value: "11:00"
      },
      // paymentMethod: {
      //   elementType: 'select',
      //   elementConfig: {
      //     options: [
      //       { value: 'paypal', displayValue: 'PayPal' },
      //       { value: 'venmo', displayValue: 'Venmo' },
      //       { value: 'cash', displayValue: 'Cash' },
      //       { value: 'chasequickpay', displayValue: 'Chase QuickPay'}
      //     ]
      //   },
      //   value: ''
      // },
      message: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Your Message'
        },
        value: ''
      }
    },
    total_amount: 0,
    cake: [],
    orderCakeForm: {},
    cake_index_obj: {},
    current_cake_limitation: {}
  }

  componentDidMount() {

    // fetch current date cake limit 
    const queryDate = minOrderDate();
    axios.get("http://localhost:8080/api/CakeLimitationDates/current_cake_limitation" + "/?date=" + queryDate)
      .then((response) => {
        console.log('repsonse', response.data);
        this.setState({ current_cake_limitation: response.data });
      })
      .catch((error) => {
        console.log('error', error);
      })

    axios.get("http://localhost:8080/api/Cakes")
      .then((response) => {

        const cake_index_obj = {};

        console.log('response', response.data);

        const index_id = {};

        for (let cake in response.data) {

          const category = response.data[cake].category;
          const name = response.data[cake].name;

          // add order amount and set default to 0
          const temp = { orderAmount: 0 };

          // index cake id
          index_id[response.data[cake].id] = Object.assign(temp, response.data[cake]);

          // index category
          if (!cake_index_obj[category]) {
            cake_index_obj[category] = {};
          }
          // index name 
          if (!cake_index_obj[category][name]) {
            cake_index_obj[category][name] = [];
          }
          cake_index_obj[category][name].push(response.data[cake]);
        }


        this.setState({
          cake_index_obj: cake_index_obj,
          orderCakeForm: index_id
        });
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = {
      ...this.state.orderForm
    }

    const updateFormElement = {
      ...updateOrderForm[inputIdentifier]
    }

    if (inputIdentifier === "pickup") {
      console.log(' event.target.value', event.target.value);
      axios.get("http://localhost:8080/api/CakeLimitationDates/current_cake_limitation" + "/?date=" + event.target.value)
        .then((response) => {
          console.log('repsonse', response.data);
          this.setState({ current_cake_limitation: response.data });
        })
        .catch((error) => {
          console.log('error', error);
        })
    }

    updateFormElement.value = event.target.value;
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({ orderForm: updateOrderForm });

  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    for (let formCakeIndentifier in this.state.orderCakeForm) {
      if (this.state.orderCakeForm[formCakeIndentifier].orderAmount > 0) {
        formData[formCakeIndentifier] = this.state.orderCakeForm[formCakeIndentifier];
      }
    }

    formData["order_time"] = Date.now();
    formData["total_amount"] = this.state.total_amount;
    formData["cake"] = this.state.cake;
    

    const order = {
      orderData: formData
    }

    console.log(order);
    axios.post('http://localhost:8080/api/Orders/create_order', order.orderData)
      .then(response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
      })
  }

  updateCakeAmountChangedHandler = (event, testcake) => {
    if (event.target.value < 0 || event.target.value > 9) {
      event.preventDefault();
      event.target.value = 9;
    }

    const inputIdentifier = event.target.name;

    const updateOrderCakeForm = {
      ...this.state.orderCakeForm
    }

    const updateCakeFormElement = {
      ...updateOrderCakeForm[inputIdentifier]
    }

    updateCakeFormElement.orderAmount = event.target.value;
    updateOrderCakeForm[inputIdentifier] = updateCakeFormElement;

    let total = 0;
    let cake = [];
    // get total amount and cakes
    for (let key in updateOrderCakeForm){
      if(updateOrderCakeForm[key].orderAmount > 0){
        console.log(updateOrderCakeForm[key]);
        total = total + (updateOrderCakeForm[key].price * updateOrderCakeForm[key].orderAmount) ;
        cake.push(key);
      }
    }

    this.setState({ 
      orderCakeForm: updateOrderCakeForm,
      total_amount: total,
      cake: cake
    });
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
            min={formElement.config.min}
            max={formElement.config.max}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}> Submit</Button>
        {(this.state.current_cake_limitation.date_amount_limit < 200 ? <h1>Sold Out Today</h1> : <CakeMenuDisplay cake_index_obj={this.state.cake_index_obj} updateCakeAmountChangedHandler={this.updateCakeAmountChangedHandler} />)}
      </form>
    );
  }
}

export default OrderData;
