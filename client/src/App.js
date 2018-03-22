import React, { Component } from 'react';

import './App.css';
// import {Link, Route, Switch} from 'react-router-dom';
import Sim from './simulator/sim.js';
import './simulator/sim.css';


class App extends Component {
  
  render() {
    return (
      <div>
        <Sim />
      </div>
    );
  }
}

export default App;