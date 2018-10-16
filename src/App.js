import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <BrowserRouter >
          <Layout>
            <Route to="/" component={Home} />
          </Layout>
        </BrowserRouter >
      </div>
    );
  }
}

export default App;
