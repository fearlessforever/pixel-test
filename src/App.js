import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import ROUTE from './load/route'
import store from './load/store'

class App extends Component {
  render() {
    return (
        <ROUTE store={store} />
    );
  }
}

export default App;
