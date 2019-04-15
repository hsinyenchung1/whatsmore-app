import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import axios from 'axios';
import UIButton from '../../UI/Button/UIButton';
import CakeMenuDisplay from './CakeMenuDisplay/CakeMenuDisplay';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './OrderData.scss';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

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

var formatTitle = (category) => {
  let words = category.split('_');
  for (let w in words) {
    words[w] = words[w][0].toUpperCase() + words[w].substring(1, words[w].length);
  }
  return words.join(' ');;
}

var toUpperCaseFirstWord = (name) => {
  let words = name.split(' ');
  for (let w in words) {
    words[w] = words[w][0].toUpperCase() + words[w].substring(1, words[w].length);
  }
  return words.join(' ');;
}
class OrderData extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '',
            label: 'Name',
            required: true
          },
          isValid: true,
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '',
            label: 'Email',
            required: true,
          },
          isValid: true,
          value: ''
        },
        phone: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: '',
            label: 'Phone',
            required: true,
          },
          isValid: true,
          value: ''
        },
        wechat: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '',
            label: 'Wechat',
            required: false,
          },
          isValid: true,
          value: ''
        },
        pickup_date: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: '',
            label: 'Pickup Date',
            min: minOrderDate(),
            max: maxOrderDate(),
            required: true
          },
          isValid: true,
          value: minOrderDate()
        },
        pickup_time: {
          elementType: 'input',
          elementConfig: {
            type: 'time',
            min: "11:00",
            max: "20:00",
            required: true,
            placeholder: '',
            label: 'Pickup time'
          },
          isValid: true,
          value: "15:00"
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
            placeholder: '',
            label: 'Message',
            required: false,
          },
          isValid: true,
          value: ''
        }
      },
      for_birthday: false,
      total_amount: 0,
      cake: [],
      orderCakeForm: {},
      cake_index_obj: {},
      current_cake_limitation: {},
      order_detail: {}
    }
  }

  componentDidMount() {

    // fetch current date cake limit 
    const queryDate = minOrderDate();
    axios.get(process.env.REACT_APP_DOMAIN + "/api/CakeLimitationDates/current_cake_limitation/?date=" + queryDate)
      .then((response) => {
        this.setState({ current_cake_limitation: response.data });
      })
      .catch((error) => {
        console.log('error', error);
      })

    axios.get(process.env.REACT_APP_DOMAIN + "/api/Cakes")
      .then((response) => {

        const cake_index_obj = {};
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

    if (inputIdentifier === "pickup_date") {
      axios.get(process.env.REACT_APP_DOMAIN + "/api/CakeLimitationDates/current_cake_limitation/?date=" + event.target.value)
        .then((response) => {
          this.setState({ current_cake_limitation: response.data });
        })
        .catch((error) => {
          console.log('error', error);
        })
    }

    if (event.target.value.trim() === "" && updateOrderForm[inputIdentifier].elementConfig.required) {
      updateFormElement.isValid = false;
    } else {
      updateFormElement.isValid = true;
    }

    updateFormElement.value = event.target.value;
    updateOrderForm[inputIdentifier] = updateFormElement;
    this.setState({ orderForm: updateOrderForm });
  }

  checkboxHandler = (event, inputIdentifier) => {
    let for_birthday = this.state[inputIdentifier];
    for_birthday = event.target.checked;
    this.setState({ for_birthday: for_birthday });
  }

  orderHandler = (event, history) => {

    event.preventDefault();
    if (this.state.total_amount === 0) {
      return true;
    }

    // show spinner 
    this.props.toggleSpinner();

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
    formData["order_detail"] = JSON.stringify(this.state.order_detail);
    formData["for_birthday"] = this.state.for_birthday;

    const order = {
      orderData: formData
    }

    axios.post(process.env.REACT_APP_DOMAIN + '/api/Orders/create_order', order.orderData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })

    setTimeout(() => {
      // turn off spinner
      this.props.toggleSpinner();
      history.push('/confirm');
    }, 1000)

    return true;
  }

  updateCakeAmountChangedHandler = (event) => {
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
    let order_detail = [];
    // get total amount and cakes
    for (let key in updateOrderCakeForm) {
      if (updateOrderCakeForm[key].orderAmount > 0) {
        total = total + (updateOrderCakeForm[key].price * updateOrderCakeForm[key].orderAmount);
        cake.push(key);
        order_detail.push({
          cake_oid: key,
          price: updateOrderCakeForm[key].price,
          order_amount: updateOrderCakeForm[key].orderAmount,
          name: updateOrderCakeForm[key].name,
          size: updateOrderCakeForm[key].size
        })
      }
    }

    this.setState({
      orderCakeForm: updateOrderCakeForm,
      total_amount: total,
      cake: cake,
      order_detail: order_detail
    });
  }

  nextDateHandler = (event) => {
    event.preventDefault();
    const updateOrderCakeForm = {
      ...this.state.orderForm
    }

    const updateCakeFormElement = {
      ...updateOrderCakeForm['pickup_date']
    }

    const date_obj = new Date(updateCakeFormElement.value);
    date_obj.setDate(date_obj.getDate() + 2);

    var formattedNumber = function (number) {
      return ("0" + number).slice(-2);
    }
    const year = date_obj.getFullYear();
    const month = formattedNumber(date_obj.getMonth() + 1);
    const date = formattedNumber(date_obj.getDate());

    updateCakeFormElement.value = year + '-' + month + '-' + date;
    updateOrderCakeForm['pickup_date'] = updateCakeFormElement;
    axios.get(process.env.REACT_APP_DOMAIN + "/api/CakeLimitationDates/current_cake_limitation/?date=" + updateCakeFormElement.value)
      .then((response) => {
        console.log('repsonse', response.data);
        this.setState({ current_cake_limitation: response.data });
      })
      .catch((error) => {
        console.log('error', error);
      })
    this.setState({ orderForm: updateOrderCakeForm });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleCloseErrorModal = () => {
    this.setState({ showErrorModal: false });
  }

  handleShow(event) {
    // show spinner 
    this.props.toggleSpinner();

    event.preventDefault();
    const formData = {};

    let validationError = false;
    const updateOrderForm = {
      ...this.state.orderForm
    }

    if(this.state.total_amount === 0){
      validationError = true;
      this.setState({
        errorTitle: "Please select a cake",
        showErrorModal: true,
        errorMessage: "Please select a cake from above."
      });
    }

    // check if required field is empty
    for (let formElementIdentifier in updateOrderForm) {
      if (updateOrderForm[formElementIdentifier].value === '' && updateOrderForm[formElementIdentifier].elementConfig.required) {
        updateOrderForm[formElementIdentifier].isValid = false;
        validationError = true;
        this.setState({
          errorTitle: "User information is required",
          showErrorModal: true,
          errorMessage: toUpperCaseFirstWord(formElementIdentifier) + " can not be empty."
        });
      }
      // check if order is less than 5 date
      if (formElementIdentifier === "pickup_date") {
        let submitedDate = new Date(updateOrderForm[formElementIdentifier].value);
        let minDate = new Date(minOrderDate());
        let maxDate = new Date(maxOrderDate());
        if (submitedDate < minDate || maxDate < submitedDate) {
          updateOrderForm[formElementIdentifier].isValid = false;
          validationError = true;
          this.setState({
            errorTitle: "Date is not available.",
            showErrorModal: true,
            errorMessage: "We only accpet date after " + minOrderDate() + " and before " + maxOrderDate() + " ."
          });
        }
        if (submitedDate.getDay() === 6) {
          updateOrderForm[formElementIdentifier].isValid = false;
          validationError = true;
          let date = submitedDate.getDate();
          let month = submitedDate.getMonth() + 1;
          let year = submitedDate.getFullYear();
          this.setState({
            errorTitle: "Date is not available.",
            showErrorModal: true,
            errorMessage: "Sorry, We close on Sunday. " + year + "-" + month + "-" + date
          });
        }
      }
    }

    if (validationError) {
      this.setState({ orderForm: updateOrderForm });
    } else {
      for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }

      for (let formCakeIndentifier in this.state.orderCakeForm) {
        if (this.state.orderCakeForm[formCakeIndentifier].orderAmount > 0) {
          formData[formCakeIndentifier] = this.state.orderCakeForm[formCakeIndentifier];
        }
      }

      formData["total_amount"] = this.state.total_amount;
      formData["cake"] = this.state.cake;

      const order = {
        orderData: formData
      }

      this.setState({
        show: true,
        confirmationModalBodyContentObject: order['orderData']
      });

    }


    setTimeout(() => {
      // turn off spinner
      this.props.toggleSpinner();
    }, 500)
  }

  render() {

    const formElementSArray = [];
    for (let key in this.state.orderForm) {
      formElementSArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let confirmation = [];
    if (this.state.confirmationModalBodyContentObject !== undefined) {

      let confirmationModalBodyContentObject = this.state.confirmationModalBodyContentObject;
      for (let key in confirmationModalBodyContentObject) {

        // pass cake property and pass oid in cake
        if (key !== 'total_amount' && key !== 'cake' && key !== 'order_detail' && !confirmationModalBodyContentObject['cake'].includes(key)) {
          confirmation.push(
            <div key={key} className={classes['DisplayConfirmItem']}>
              <div className={classes['DisplayPeroerty']}>
                {formatTitle(key)}:
              </div>
              <div className={classes['DisplayValue']}>
                {confirmationModalBodyContentObject[key]}
              </div>
            </div>
          )
        }
      }

      confirmation.push(
        <div key="Birthday" className={classes['DisplayConfirmItem']}>
          <div className={classes['DisplayPeroerty']}>
            For Birthday
            </div>
          <div className={classes['DisplayValue']}>
            {this.state.for_birthday ? "Yes" : "No"}
          </div>
        </div>
      )

      // display cake name and ammount
      const cakes = confirmationModalBodyContentObject['cake'];
      const displayCakes = [];
      for (let cake in cakes) {
        const orderAmount = confirmationModalBodyContentObject[cakes[cake]].orderAmount;
        const name = confirmationModalBodyContentObject[cakes[cake]].name;
        const price = confirmationModalBodyContentObject[cakes[cake]].price;
        const totalAmount = orderAmount * price;
        displayCakes.push(
          {
            orderAmount: orderAmount,
            name: name,
            price: price,
            totalAmount: totalAmount
          }
        );
      }

      confirmation.push(
        <div key={'hr'} className={classes['HR']}></div>
      );

      for (let cake in displayCakes) {
        confirmation.push(
          <div key={cake} className={classes['DisplayConfirmItem']}>
            <div className={classes['DisplayPeroerty']}>
              {toUpperCaseFirstWord(displayCakes[cake].name)} (${displayCakes[cake].price}) * {displayCakes[cake].orderAmount}
            </div>
            <div className={classes['DisplayValue']}>
              ${displayCakes[cake].totalAmount}
            </div>
          </div>
        )
      }

      confirmation.push(
        <div key={'hr1'} className={classes['HR']}></div>
      );


      confirmation.push(
        <div key={'total_amount'} className={classes['DisplayConfirmItem']}>
          <div className={classes['DisplayPeroerty']}>
            {formatTitle('total_amount')}:
            </div>
          <div className={classes['DisplayValue']}>
            ${confirmationModalBodyContentObject['total_amount']}
          </div>
        </div>
      );

    }


    return (
      <div>
        <Spinner>
          {(
            this.state.current_cake_limitation.date_amount_limit < 200 ?
              <h1>We sold out today. Pleace choose other day</h1> :
              <CakeMenuDisplay
                cake_index_obj={this.state.cake_index_obj}
                updateCakeAmountChangedHandler={this.updateCakeAmountChangedHandler} />
          )}
          <form className={classes['Form']} onSubmit={this.orderHandler} formNoValidate>
            {formElementSArray.map((formElement) => (
              <div className={classes[formElement.id]} id={formElement.id} key={formElement.id}>
                <Input
                  inputType={formElement.config.isValid ? '' : 'Error'}
                  label={formElement.config.elementConfig.label}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  min={formElement.config.min}
                  max={formElement.config.max}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)} />
              </div>
            ))}
            <div className={classes['forBirthday']} onChange={(event) => this.checkboxHandler(event, "for_birthday")}>
              <label>For Birthday</label>
              <input type="checkbox" ></input>
            </div>
            <Button className={classes['buttonSubmit']} onClick={this.handleShow}>
              Next
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title bsClass={classes['ModalTitle']}>
                  Confirm Your Orders
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={classes['Confirmation']}>
                  {confirmation}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className={classes['ConfirmButtonGroup']}>
                  <div className={classes['ConfirmButton']}>
                    <UIButton clicked={this.handleClose} > Cancel</UIButton>
                  </div>

                  <div className={classes['ConfirmButton']}>
                    <UIButton btnType={this.state.total_amount === 0 ? "Disable" : ""} clicked={this.orderHandler} to='/confirm'> Confirm</UIButton>
                  </div>
                </div>

              </Modal.Footer>
            </Modal>
          </form>

          <Modal show={this.state.showErrorModal} onHide={this.handleCloseErrorModal}>
            <Modal.Header>
              <Modal.Title bsClass={classes['ModalTitle']}>
               {this.state.errorTitle}
                  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.errorMessage}
            </Modal.Body>
            <Modal.Footer>
              <UIButton clicked={this.handleCloseErrorModal} > Cancel</UIButton>
            </Modal.Footer>
          </Modal>
        </Spinner>
      </div>
    );
  }
}

export default OrderData;
