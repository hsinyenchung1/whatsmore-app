import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import Policy from './components/Policy/Policy';
import Order from './components/Order/Order';
import Cake from './components/Cake/Cake';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <BrowserRouter >
          <Layout>
            <Switch >
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/menu" component={Menu} />
              <Route path="/policy" component={Policy} />
              <Route path="/order" component={Order} />
              <Route path="/cake" component={Cake} />
            </Switch>
          </Layout>
        </BrowserRouter >
      </div>
    );
  }
}

export default App;
