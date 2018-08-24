import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Sim from './simulator/sim.js';
import evolve from "./images/Evolve.png";



class App extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route exact path='/' component={Sim} />
        </Switch>
      </div>
    );
  }
}

export default App;