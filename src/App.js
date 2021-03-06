import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Order from './components/Order/Order';
import Confirm from './components/Confirm/Confirm';
import Desgin from './components/Desgin/Desgin';
import { Switch, Route } from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';

class App extends Component {

  state = {
    enable_spinner: false
  }

  toggleSpinner() {
    this.setState({ enable_spinner: !this.state.enable_spinner });
  }

  redirect = (path) => {
    let mapping = {
      "/admin_dashboard": process.env.REACT_APP_DOMAIN + "/admin_dashboard"
    }
    window.location.href = mapping[path];
    return null;
  }

  render() {
    return (
      <Spinner show={this.state.enable_spinner}>
        <div className="App">
          <BrowserRouter >
            <Layout>
              <Switch >
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/order" render={() => <Order toggleSpinner={() => this.toggleSpinner()} />} />
                <Route path="/confirm" component={Confirm} />} />
                <Route path="/Desgin" component={Desgin} />} />

                <Route path="/admin_dashboard" render={() => this.redirect("/admin_dashboard")} />
              </Switch>
            </Layout>
          </BrowserRouter >
        </div>
      </Spinner>

    );
  }
}

export default App;
